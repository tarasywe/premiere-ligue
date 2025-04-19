desc "Build Android for Google Play(Production)"
private_lane :build_android_store do
  gradle_clean_build

  gradle(
    task: ENV["ANDROID_BUILD_TASK_STORE"],
    build_type: ENV["ANDROID_BUILD_TYPE_RELEASE"],
    project_dir: ENV["ANDROID_DIR"]
  )

#   upload_to_play_store(
#     track: "internal",
#     json_key: "android/upload.json",
#     package_name: ENV["ANDROID_BUNDLE_ID"],
#     skip_upload_apk: true
#   )

end
