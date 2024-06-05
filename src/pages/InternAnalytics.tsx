import { useEffect, useState, useRef } from "react";
import BarChart from "./BarChart"; // Assuming BarChart is in the same directory
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axiosInstance from "@/api/host";
import { useReactToPrint } from "react-to-print";

const InternAnalytics = () => {
  const [internName, setInternName] = useState("");
  const [chartData, setChartData] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const printArea = useRef(null);

  const fetchAnalyticsData = async () => {
    // Assuming the analytics data is fetched from an API or elsewhere
    // Here, setting the data directly for demonstration purposes

    try {
      const res = await axiosInstance.get(
        `/details/get-all-details/${internName}`
      );

      console.log("Response form get analytics data:: ", res.data);
      if (res.data) {
        const data = await res.data;
        console.log("Data fetched", data);
        setJsonData(data);
        setChartData(data.chartData);
        setTableData(data.tableData);
        toast("Data feteched successfully!🎆", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printArea.current,
    documentTitle: `${internName} Performance Analytics`,
    onPrintError: () => alert("there is an error when printing"),
  });

  function camelToSentenceCase(str) {
    // Replace all occurrences of capital letters preceded by lowercase letters with a space followed by the lowercase letter
    return (
      str
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        // Then capitalize the first letter
        .replace(/^./, function (match) {
          return match.toUpperCase();
        })
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10">
      <Button className="absolute top-4 left-4 w-16 ">
        <Link to="/rate">Back</Link>
      </Button>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div>
        <div className="flex flex-col items-center justify-center gap-3 space-x-2">
          <h2 className="text-lg font-medium">Get intern analytics</h2>
          <select
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={internName}
            onChange={(e) => setInternName(e.target.value)}
          >
            <option value="">Select intern name</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <div className="flex gap-3 justify-center items-center">
            <button
              onClick={fetchAnalyticsData}
              className="bg-black  text-white px-4 py-2  rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Get analytics
            </button>

            {jsonData && (
              <button
                onClick={handlePrint}
                className="bg-black  text-white px-4  py-2 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Export as PDF
              </button>
            )}
          </div>
        </div>

        {/* PRINTED CONTENT */}
        <section ref={printArea} className="px-10 w-screen">
          <style type="text/css" media="print">
            {
              "\
  @page { size: landscape; }\
"
            }
          </style>
          {/* Bar Chart */}
          {jsonData && (
            <div className="w-full max-w-[70vw] mt-8 mb-12 justify-center flex">
              <BarChart jsonData={jsonData} />
            </div>
          )}

          <div className="page-break" />
          <div className="page-break" />

          {/* Render document data */}
          {jsonData && (
            <div className="mt-16">
              <h3 className="text-2xl font-medium">
                Recommendations and Remarks
              </h3>
              {Object.entries(jsonData.docsData).map(([key, value]) => (
                <div key={key} className="my-4">
                  <p className="font-bold">{camelToSentenceCase(key)}:</p>
                  {typeof value === "object" ? (
                    <ul>
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <li key={subKey}>
                          {subKey}: {subValue}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="page-break" />
          <div className="page-break" />
          <div className="page-break" />

          {/* Render table data */}
          {jsonData && (
            <div className="w-full max-w-6xl mt-8">
              <Table className="border border-black">
                <TableHeader>
                  <TableRow>
                    {/* Render table headers */}
                    <TableHead className="bg-[#9ccc65] dark:bg-[#9ccc65]/50">
                      Attributes
                    </TableHead>
                    <TableHead className="dark:bg-gray-800/50">
                      Search Engine Questionnaire
                    </TableHead>
                    <TableHead className="dark:bg-gray-800/50">
                      Teach a topic
                    </TableHead>
                    <TableHead className="dark:bg-gray-800/50">
                      Group discussion
                    </TableHead>
                    <TableHead className="dark:bg-gray-800/50">
                      Google Spreadsheet
                    </TableHead>
                    <TableHead className="dark:bg-gray-800/50">
                      Origami
                    </TableHead>
                    <TableHead className="dark:bg-gray-800/50">
                      Team Task
                    </TableHead>
                    <TableHead className="dark:bg-gray-800/50">
                      Punctuality
                    </TableHead>
                    <TableHead className="dark:bg-gray-800/50">
                      Attendance
                    </TableHead>
                    <TableHead className="bg-[#b39ddb] dark:bg-[#b39ddb]/50">
                      Average
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="dark:bg-gray-800/50">
                      Responsibility
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.searchEngineQuestionnare.responsibility}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.teachATopic.responsibility}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="bg-[#b39ddb] dark:bg-[#b39ddb]/50">
                      {tableData.attributeAverages[0].toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="dark:bg-gray-800/50">
                      Ability to learn
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.googleSpreadsheet.abilityToLearn}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.origami.abilityToLearn}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="bg-[#b39ddb] dark:bg-[#b39ddb]/50">
                      {tableData.attributeAverages[1].toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="dark:bg-gray-800/50">
                      Research skills
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.searchEngineQuestionnare.researchSkills}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.teachATopic.researchSkills}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.groupDiscussion.researchSkills}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.teamTask.researchSkills}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="bg-[#b39ddb] dark:bg-[#b39ddb]/50">
                      {tableData.attributeAverages[2].toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="dark:bg-gray-800/50">
                      Quality of work
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.searchEngineQuestionnare.qualityOfWork}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.teachATopic.qualityOfWork}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.groupDiscussion.qualityOfWork}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.teamTask.qualityOfWork}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="bg-[#b39ddb] dark:bg-[#b39ddb]/50">
                      {tableData.attributeAverages[3].toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="dark:bg-gray-800/50">
                      Communication skills
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.teachATopic.communicationSkills}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.groupDiscussion.communicationSkills}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.teamTask.communicationSkills}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="bg-[#b39ddb] dark:bg-[#b39ddb]/50">
                      {tableData.attributeAverages[4].toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="dark:bg-gray-800/50">
                      Planning and problem solving
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50"></TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.teamTask.planningAndProblemSolving}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.punctuality.planningAndProblemSolving}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.attendance.planningAndProblemSolving}
                    </TableCell>
                    <TableCell className="bg-[#b39ddb] dark:bg-[#b39ddb]/50">
                      {tableData.attributeAverages[5].toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-[#9ccc65] dark:bg-[#9ccc65]/50">
                      Average
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.taskAverages[0].toFixed(2)}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.taskAverages[1].toFixed(2)}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.taskAverages[2].toFixed(2)}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.taskAverages[3].toFixed(2)}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.taskAverages[4].toFixed(2)}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.taskAverages[5].toFixed(2)}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.taskAverages[6].toFixed(2)}
                    </TableCell>
                    <TableCell className="dark:bg-gray-800/50">
                      {tableData.taskAverages[7].toFixed(2)}
                    </TableCell>
                    <TableCell className="bg-[#b39ddb] dark:bg-[#b39ddb]/50">
                      {tableData.taskAverages
                        .reduce((acc, curr) => acc + curr, 0)
                        .toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default InternAnalytics;
