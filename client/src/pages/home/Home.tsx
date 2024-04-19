import HomeExploreBySkill from './home-explore-by-skill/HomeExploreBySkill';
import HomeHero from './home-hero/HomeHero';
import HomeHowToStart from './home-how-to-start/HomeHowToStart';
import HomeSearch from './home-search/HomeSearch';

function Home() {
  return (
    <>
      <HomeHero />
      <HomeSearch />
      <HomeExploreBySkill />
      <HomeHowToStart />
    </>
  );
}

export default Home;
