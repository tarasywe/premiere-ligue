desc "Gradle Clean"
lane :gradle_clean_build do
  gradle(task: ENV["ANDROID_CLEAN_TASK"], project_dir: ENV["ANDROID_DIR"])
end
