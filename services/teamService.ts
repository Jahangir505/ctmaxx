// src/services/teamService.ts
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/FirebaseConfig";

// Function to distribute profit to team members
export const distributeTeamProfit = async (teamId: string, profitAmount: number) => {
  const membersSnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
  let totalDistributedProfit = 0;

  // Loop through each team member to calculate and add profit to main balance
  membersSnapshot.forEach(async (member) => {
    const memberData = member.data();
    
    if (memberData.teamId === teamId) {
      const commission = calculateMemberCommission(memberData.rank, profitAmount);
      const newBalance = (memberData.mainBalance || 0) + commission;
      
      await updateDoc(doc(FIRESTORE_DB, "users", member.id), {
        mainBalance: newBalance,
        totalCommission: (memberData.totalCommission || 0) + commission
      });

      totalDistributedProfit += commission;
    }
  });

  console.log(`Total distributed profit: ${totalDistributedProfit}`);
};

// Helper function to calculate commission based on rank
const calculateMemberCommission = (rank: string, profit: number) => {
  const commissionRates: { [key: string]: number } = { "1st": 0.20, "2nd": 0.15, "3rd": 0.10 };
  return profit * (commissionRates[rank] || 0);
};
