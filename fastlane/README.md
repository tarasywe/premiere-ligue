fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### firebase

```sh
[bundle exec] fastlane firebase
```

Firebase builds

### store

```sh
[bundle exec] fastlane store
```

Store builds

### e2e

```sh
[bundle exec] fastlane e2e
```

E2E Testing

### update_bundle_versions

```sh
[bundle exec] fastlane update_bundle_versions
```

Increment App version and build number

### update_ios_signings

```sh
[bundle exec] fastlane update_ios_signings
```

Import ios certificates of DEV, ADHOC and APPSTORE, allows to add new devices for adhoc testing

### latest_changes

```sh
[bundle exec] fastlane latest_changes
```

Commit changes from latest firebase build

### gradle_clean_build

```sh
[bundle exec] fastlane gradle_clean_build
```

Gradle Clean

### update_app_json

```sh
[bundle exec] fastlane update_app_json
```

Increment Version and Build Number for both iOS and Android

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
