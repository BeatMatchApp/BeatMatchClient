import {
  getUserDetails,
  redirectToSpotify,
} from "../../services/spotifyService";
import { useEffect, useState } from "react";

interface CurrentUsersProfileResponse {
  id: string;
  email: string;
  display_name: string;
}

function UserDetails() {
  const [user, setUser] = useState<CurrentUsersProfileResponse | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");

    if (token) {
      getUserDetails(token).then((userData) => {
        setUser(userData);
      });
    } else {
      redirectToSpotify();
    }
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
        </ul>
      </section>
    </>
  );
}

export default UserDetails;
