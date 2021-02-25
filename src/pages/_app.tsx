import { ChanllengesProvider } from "../contexts/ChallengeContext";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChanllengesProvider>
      <Component {...pageProps} />
    </ChanllengesProvider>
  );
}

export default MyApp;
