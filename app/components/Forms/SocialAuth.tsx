import { Google, Spotify } from "../Icons/SocialIcons";
import Button from "../UI/Button";

export default function SocialAuth(): JSX.Element {
  function _handleGoogleAuth() {}

  function _handleSpotifyAuth() {}

  return (
    <div className="flex items-center flex-row justify-between gap-x-4 mt-[20px]">
      <Button variant="social" width="50%">
        <Google />
      </Button>
      <Button variant="social" width="50%">
        <Spotify />
      </Button>
    </div>
  );
}
