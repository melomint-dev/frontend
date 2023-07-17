import API_CONSTANTS from "@/utils/apiConstants";

class FlowAbstractionService {
  getTrendndingSongs = async () => {
    try {
      const res = await fetch(API_CONSTANTS.GET_TRENDING_SONGS);
      return await res.json();
    } catch (error) {
      console.log("ERROR -- GET TRENDING SONGS", error);
      throw error;
    }
  };

  getLatestSongs = async () => {
    try {
      const res = await fetch(API_CONSTANTS.GET_LATEST_SONGS);
      return await res.json();
    } catch (error) {
      console.log("ERROR -- GET LATEST SONGS", error);
      throw error;
    }
  };

  getArtistsOnRise = async () => {
    try {
      const res = await fetch(API_CONSTANTS.GET_ARTISTS_ON_RISE);
      return await res.json();
    } catch (error) {
      console.log("ERROR -- GET ARTISTS ON RISE", error);
      throw error;
    }
  };

  searchQuery = async ([url, query]: [string, string]) => {
    try {
      const res = await fetch(API_CONSTANTS.SEARCH_QUERY + "?q=" + query);
      return await res.json();
    } catch (error) {
      console.log("ERROR -- SEARCH QUERY", error);
      throw error;
    }
  };
}

const flowAbstractionService = new FlowAbstractionService();
export default flowAbstractionService;
