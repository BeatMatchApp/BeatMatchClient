import { UserSpotifyProfile } from "../../models/UserSpotifyProfile";
import {
  getUserDetails,
  redirectToSpotify,
} from "../../services/spotifyService";
import { useEffect, useState } from "react";

function UserDetails() {
  const [user, setUser] = useState<UserSpotifyProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("accessToken");

      if (!token) {
        redirectToSpotify();
        return;
      }

      try {
        const userData = await getUserDetails(token);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        // Optionally redirect again or show error UI
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h1>Display your Spotify profile data</h1>

      <section id="profile">
        <h2>
          Logged in as <span>{user.display_name}</span>
        </h2>
        <ul>
          <li>
            User ID: <span>{user.id}</span>
          </li>
          <li>
            Email: <span>{user.email}</span>
          </li>
          <li>
            Spotify URI: <a href={user.uri}>{user.uri}</a>
          </li>
          <li>
            Link:{" "}
            <a href={user.external_urls.spotify}>
              {user.external_urls.spotify}
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default UserDetails;
