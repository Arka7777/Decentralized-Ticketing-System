const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`🚀 Deploying contract using account: ${deployer.address}\n`);

  // Deploy the Ticketing contract
  const Ticketing = await hre.ethers.getContractFactory("Ticketing");
  const ticketing = await Ticketing.deploy("Event Ticket", "ETK"); 
  await ticketing.waitForDeployment();

  const ticketingAddress = await ticketing.getAddress();
  console.log(`✅ Ticketing contract successfully deployed at: ${ticketingAddress}\n`);

  // Predefined event list
  const events = [
    {
      name: "Hackathon 2025",
      cost: hre.ethers.parseEther("0.2"),
      maxTickets: 100,
      date: "July 10",
      time: "10:00 AM UTC",
      location: "New York, USA",
    },
    {
      name: "Blockchain Summit",
      cost: hre.ethers.parseEther("0.5"),
      maxTickets: 200,
      date: "August 15",
      time: "2:00 PM UTC",
      location: "London, UK",
    },
    {
      name: "Ethereum DevCon",
      cost: hre.ethers.parseEther("0.3"),
      maxTickets: 150,
      date: "September 5",
      time: "9:00 AM UTC",
      location: "Berlin, Germany",
    },
    {
      name: "AI & Web3 Conference",
      cost: hre.ethers.parseEther("0.4"),
      maxTickets: 120,
      date: "October 20",
      time: "3:00 PM UTC",
      location: "San Francisco, USA",
    },
    {
      name: "Metaverse Expo",
      cost: hre.ethers.parseEther("0.1"),
      maxTickets: 180,
      date: "November 10",
      time: "1:00 PM UTC",
      location: "Dubai, UAE",
    },
  ];

  // Loop through and list events
  console.log("📌 Listing events on the blockchain...\n");
  for (let i = 0; i < events.length; i++) {
    try {
      const tx = await ticketing.list(
        events[i].name,
        events[i].cost,
        events[i].maxTickets,
        events[i].date,
        events[i].time,
        events[i].location
      );
      await tx.wait(); 
      console.log(`✅ Event ${i + 1}: ${events[i].name} listed successfully!`);
    } catch (error) {
      console.error(`❌ Failed to list event ${events[i].name}:`, error);
    }
  }

  console.log("\n🎉 All events have been successfully listed!");
}

// Handle script errors
main()
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
