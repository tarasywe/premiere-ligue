desc "Increment Version and Build Number for both iOS and Android"
private_lane :increment_build do |options|
  platform = options[:platform] ||= nil
  options[:version_number] ||= nil
  options[:version_code] ||= nil

  if platform.nil? || platform == :ios
    increment_build_number(
      xcodeproj: ENV["IOS_PROJECT"],
      build_number: options[:version_code]
    )
    increment_version_number(
      version_number: options[:version_number],
      xcodeproj: ENV["IOS_PROJECT"]
    )
  end

  if platform.nil? || platform == :android
    android_set_version_code(
      gradle_file: ENV["ANDROID_GRADLE"],
      version_code: options[:version_code]
    )
    android_set_version_name(
      gradle_file: ENV["ANDROID_GRADLE"],
      version_name: options[:version_number]
    )
  end

  if platform.nil?
    UI.success("Incremented build and version numbers for both iOS and Android")
  elsif platform == :ios
    UI.success("Incremented build and version numbers for iOS")
  elsif platform == :android
    UI.success("Incremented build and version numbers for Android")
  end
end


desc "Increment Version and Build Number for both iOS and Android"
lane :update_app_json do |options|
  require 'json'

  # Path to app.json
  app_json_path = '../app.json'

  # Read current app.json
  app_json = JSON.parse(File.read(app_json_path))

  # Get version and build number from ENV variables
  new_version = options[:version]

  # Update values in app.json
  app_json['expo']['version'] = new_version

  # Write back to app.json
  File.write(app_json_path, JSON.pretty_generate(app_json))

  puts "Updated app.json with version #{new_version}"

  sh "bash ../expo.sh"
end
