Pod::Spec.new do |s|
  s.name         = "RNAppShortcuts"
  s.version      = "1.0.0"
  s.summary      = "React Native App Shortcuts"
  s.description  = "Native iOS and Android app shortcuts for React Native"
  s.homepage     = "https://github.com/pentair/react-native-app-shortcuts"
  s.license      = "MIT"
  s.author       = { "Pentair" => "developer@pentair.com" }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://github.com/pentair/react-native-app-shortcuts.git", :tag => "master" }
  s.source_files = "ios/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React-Core"
end