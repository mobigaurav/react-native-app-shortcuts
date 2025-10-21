#import "RNAppShortcuts.h"
#import <React/RCTLog.h>

static NSString *initialShortcut = nil;
static BOOL hasListeners = NO;

@implementation RNAppShortcuts

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onShortcutPressed"];
}

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

+ (void)handleShortcutItem:(UIApplicationShortcutItem *)shortcutItem {
    if (shortcutItem) {
        NSDictionary *shortcutData = @{
            @"id": shortcutItem.type ?: @"",
            @"title": shortcutItem.localizedTitle ?: @"",
            @"subtitle": shortcutItem.localizedSubtitle ?: @"",
            @"data": shortcutItem.userInfo ?: @{}
        };
        
        if (hasListeners) {
            [[NSNotificationCenter defaultCenter] postNotificationName:@"ShortcutPressed" 
                                                                object:nil 
                                                              userInfo:shortcutData];
        } else {
            initialShortcut = shortcutItem.type;
        }
    }
}

- (instancetype)init {
    self = [super init];
    if (self) {
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(handleShortcutNotification:)
                                                     name:@"ShortcutPressed"
                                                   object:nil];
    }
    return self;
}

- (void)handleShortcutNotification:(NSNotification *)notification {
    if (hasListeners) {
        [self sendEventWithName:@"onShortcutPressed" body:notification.userInfo];
    }
}

RCT_EXPORT_METHOD(setShortcuts:(NSArray *)shortcuts
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    NSMutableArray *shortcutItems = [NSMutableArray array];
    
    for (NSDictionary *shortcut in shortcuts) {
        NSString *shortcutId = shortcut[@"id"];
        NSString *title = shortcut[@"title"];
        NSString *subtitle = shortcut[@"subtitle"];
        NSString *iconName = shortcut[@"icon"];
        NSDictionary *userData = shortcut[@"data"];
        
        if (!shortcutId || !title) {
            continue;
        }
        
        UIApplicationShortcutIcon *icon = nil;
        if (iconName) {
            icon = [UIApplicationShortcutIcon iconWithSystemImageName:iconName];
        }
        
        UIApplicationShortcutItem *item = [[UIApplicationShortcutItem alloc]
                                          initWithType:shortcutId
                                          localizedTitle:title
                                          localizedSubtitle:subtitle
                                          icon:icon
                                          userInfo:userData];
        
        [shortcutItems addObject:item];
    }
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [UIApplication sharedApplication].shortcutItems = shortcutItems;
        resolve(@(YES));
    });
}

RCT_EXPORT_METHOD(clearShortcuts:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [UIApplication sharedApplication].shortcutItems = @[];
        resolve(@(YES));
    });
}

RCT_EXPORT_METHOD(getInitialShortcut:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    if (initialShortcut) {
        resolve(@{@"id": initialShortcut});
        initialShortcut = nil;
    } else {
        resolve([NSNull null]);
    }
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end