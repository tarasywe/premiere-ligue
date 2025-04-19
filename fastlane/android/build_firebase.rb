desc "Build Android for Firebase(Staging)"
private_lane :build_android_firebase do

  # Verify next release
  next unless verify(tag_prefix: "android/firebase/*")

  build_android
  post_deploy_firebase(android: true)
end

desc "Build Android build"
private_lane :build_android do
  gradle_clean_build()

  build_type = ENV["ANDROID_BUILD_TYPE_RELEASE"]

  update_bundle_versions

  gradle(
    task: ENV["ANDROID_BUILD_TASK"],
    build_type: build_type,
    project_dir: ENV["ANDROID_DIR"],
    print_command_output: true
  )
end
