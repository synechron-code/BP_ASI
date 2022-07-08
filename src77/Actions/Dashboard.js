import axios from "axios";

const getDashboardData = async () => {
  const response = await axios.get("./dashboard-data.json");
  console.log("getdashboard data response :", response.data);
  if (response.status === 200) {
    return response.data;
  } else {
    alert("Something went wrong!");
  }
};

export const getTopologyTableData = async () => {
  const response = await axios.get("./MockFiles/Topology/getTopology.json");
  if (response.status === 200) {
    return response.data;
  } else {
    alert("Something went wrong!");
  }
};

export const getBluPrintData = async () => {
  const response = await axios.get("./MockFiles/Blueprint/getBluePrint.json");
  if (response.status === 200) {
    return response.data;
  } else {
    alert("Something went wrong!");
  }
};
export default getDashboardData;