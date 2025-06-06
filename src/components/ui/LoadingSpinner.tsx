import { avatarThinking } from "../../assets/img";

export const LoadingSpinner = () => {
  return (
    <div className="relative flex flex-1 items-center justify-center py-9">
      <div className="border-fire-opal absolute h-32 w-32 animate-spin rounded-full border-t-4 border-b-4"></div>
      <img src={avatarThinking} className="h-28 w-28 rounded-full" />
    </div>
  );
};
