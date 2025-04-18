declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      index: undefined;
      "team/[id]": { id: string };
      "player/[id]": { id: string; player: string };
    }
  }
} 