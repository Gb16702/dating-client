import { Google, Spotify } from "../Icons/SocialIcons";
import Button from "../UI/Button";

export default function SocialAuth(): JSX.Element {
  function _handleGoogleAuth() {}

  function _handleSpotifyAuth() {}

  return (
    <div className="flex items-center flex-row justify-between gap-x-4 mt-[20px]">
      <Button variant="social" customClasses="rounded-[9px] w-1/2">
        <Google />
      </Button>
      <Button variant="social" customClasses="rounded-[9px] w-1/2">
        <Spotify />
      </Button>
    </div>
  );
}
