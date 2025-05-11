import Hero from "@/components/Hero/Hero";
import Collections from "@/components/Collections/Collections";

const HomePage = () => {
    const gemstones = [
        {
            id: 1,
            name: "Shiny Emerald",
            image: "/emerald.jpg",
            owner: "Joe Burgh",
            price: "150PKR",
        },
        {
            id: 2,
            name: "Diamond",
            image: "/diamond.jpg",
            owner: "James Bill",
            price: "200PKR",
        },
        {
            id: 3,
            name: "Sapphire",
            image: "/sapphire.jpg",
            owner: "Joe Murphy",
            price: "190PKR",
        },
        {
            id: 4,
            name: "Amethyst",
            image: "/amethyst.jpg",
            owner: "Michael Starc",
            price: "180PKR",
        },
        {
            id: 5,
            name: "Ruby",
            image: "/ruby.png",
            owner: "Sarah Lee",
            price: "170PKR",
        },
        {
            id: 6,
            name: "Topaz",
            image: "/topaz.png",
            owner: "David Kim",
            price: "160PKR",
        },
        {
            id: 7,
            name: "Opal",
            image: "/opal.png",
            owner: "Emma Watson",
            price: "155PKR",
        },
        {
            id: 8,
            name: "Garnet",
            image: "/garnet.png",
            owner: "Robert Downey",
            price: "165PKR",
        },
    ];

    return (
        <div className="w-full min-h-[1000px] relative top-20 bg-[#1a1c1ff8] pb-20 mb-20 ">
            <Hero />
            <Collections collectionName={"Trending"} gemstones={gemstones} />
            <Collections
                collectionName={"Highest Volume"}
                gemstones={gemstones}
            />
            <Collections collectionName={"Reviews"} gemstones={gemstones}/>
        </div>
    );
};

export default HomePage;