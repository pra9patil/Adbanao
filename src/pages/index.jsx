import Home from "../component/Home";
import SubHero from "../component/Sub-Hero";
import YoutubeVideo from "../component/YoutubeVideo";
import FAQ from "../component/FAQ";

function MainHome() {
    return (
        <div>
            <Home />
            <SubHero />
            <YoutubeVideo />
            <FAQ />
        </div>
    )
};

export default MainHome;