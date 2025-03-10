import axios from "axios";
import { headers } from "next/headers";
import HomePage from "@/components/Home/Home";

async function getUser() {
  try {
      const headersList = await headers();
      const cookies = headersList.get("cookie") || "";

      const response = await axios.get("http://localhost:8000/auth/status", {
          headers: { Cookie: cookies },
          withCredentials: true,
      });

      return response.data?.user;
  } catch (error) {
      if (error.response?.status === 400) {
          console.warn("User is not authenticated, returning null.");
          return null;
      }
      
      console.error("Unexpected error:", error);
      return null;
  }
}


const Home = async() => {
  const userData = await getUser();
  
  const gemstones = [
    {
      id: 1,
      name: "Shiny Emerald",
      image: "/emerald.jpg",
      owner: "Joe Burgh",
      price: "150ETH",
    },
    {
      id: 2,
      name: "Diamond",
      image: "/diamond.jpg",
      owner: "James Bill",
      price: "200ETH",
    },
    {
      id: 3,
      name: "Sapphire",
      image: "/sapphire.jpg",
      owner: "Joe Murphy",
      price: "190ETH",
    },
    {
      id: 4,
      name: "Amethyst",
      image: "/amethyst.jpg",
      owner: "Michael Starc",
      price: "180ETH",
    },
    {
      id: 5,
      name: "Ruby",
      image: "/ruby.png",
      owner: "Sarah Lee",
      price: "170ETH",
    },
    {
      id: 6,
      name: "Topaz",
      image: "/topaz.png",
      owner: "David Kim",
      price: "160ETH",
    },
    {
      id: 7,
      name: "Opal",
      image: "/opal.png",
      owner: "Emma Watson",
      price: "155ETH",
    },
    {
      id: 8,
      name: "Garnet",
      image: "/garnet.png",
      owner: "Robert Downey",
      price: "165ETH",
    },
  ];

  return <HomePage initialUserData={userData} gemstones={gemstones} />;
}

export default Home;