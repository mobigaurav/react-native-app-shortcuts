package com.appshortcuts;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.os.Build;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.List;

public class RNAppShortcutsModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME = "RNAppShortcuts";
    private static String initialShortcut = null;
    private ReactApplicationContext reactContext;

    public RNAppShortcutsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    public static void handleShortcut(Intent intent) {
        if (intent != null && intent.getAction() != null) {
            String shortcutId = intent.getStringExtra("shortcut_id");
            if (shortcutId != null) {
                initialShortcut = shortcutId;
            }
        }
    }

    @ReactMethod
    public void setShortcuts(ReadableArray shortcuts, Promise promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.N_MR1) {
            promise.resolve(false);
            return;
        }

        try {
            Context context = getReactApplicationContext();
            ShortcutManager shortcutManager = context.getSystemService(ShortcutManager.class);
            
            if (shortcutManager == null) {
                promise.reject("ERROR", "ShortcutManager not available");
                return;
            }

            List<ShortcutInfo> shortcutInfos = new ArrayList<>();

            for (int i = 0; i < shortcuts.size(); i++) {
                ReadableMap shortcut = shortcuts.getMap(i);
                String id = shortcut.getString("id");
                String title = shortcut.getString("title");
                String subtitle = shortcut.hasKey("subtitle") ? shortcut.getString("subtitle") : "";
                
                if (id == null || title == null) {
                    continue;
                }

                Intent intent = new Intent(context, context.getClass());
                intent.setAction(Intent.ACTION_VIEW);
                intent.putExtra("shortcut_id", id);

                ShortcutInfo.Builder builder = new ShortcutInfo.Builder(context, id)
                        .setShortLabel(title)
                        .setLongLabel(subtitle.isEmpty() ? title : subtitle)
                        .setIntent(intent);

                // Add icon if specified
                if (shortcut.hasKey("icon")) {
                    String iconName = shortcut.getString("icon");
                    int iconRes = context.getResources().getIdentifier(iconName, "drawable", context.getPackageName());
                    if (iconRes != 0) {
                        builder.setIcon(Icon.createWithResource(context, iconRes));
                    }
                }

                shortcutInfos.add(builder.build());
            }

            shortcutManager.setDynamicShortcuts(shortcutInfos);
            promise.resolve(true);

        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void clearShortcuts(Promise promise) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.N_MR1) {
            promise.resolve(false);
            return;
        }

        try {
            Context context = getReactApplicationContext();
            ShortcutManager shortcutManager = context.getSystemService(ShortcutManager.class);
            
            if (shortcutManager != null) {
                shortcutManager.removeAllDynamicShortcuts();
            }
            
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getInitialShortcut(Promise promise) {
        if (initialShortcut != null) {
            WritableMap result = Arguments.createMap();
            result.putString("id", initialShortcut);
            promise.resolve(result);
            initialShortcut = null;
        } else {
            promise.resolve(null);
        }
    }

    private void sendEvent(String eventName, WritableMap params) {
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
        }
    }
}