import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchEngineQuestionnare } from "@/pages/forms/SearchEngineQuestionnare.tsx";
import { TeachATopic } from "@/pages/forms/TeachATopic.tsx";
import { useState } from "react";
import { GroupDiscussion } from "@/pages/forms/GroupDiscussion.tsx";
import { GoogleSpreadsheet } from "@/pages/forms/GoogleSpreadsheet.tsx";
import { Origami } from "@/pages/forms/Origami.tsx";
import { TeamTask } from "@/pages/forms/TeamTask.tsx";
import { Punctuality } from "@/pages/forms/Punctuality.tsx";
import { Attendance } from "@/pages/forms/Attendance.tsx";
import { PersonalityType } from "@/pages/forms/PersonalityType.tsx";
import { PersonalSuggestion } from "@/pages/forms/PersonalSuggestion.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function RateIntern() {
  const [selectedForm, setSelectedForm] = useState<number | null>(1);

  return (
    <div className="flex flex-col min-h-screen w-full dark:bg-gray-900 md:flex-row">
      <div className="w-full border-b bg-gray-800 p-6 dark:bg-gray-800 md:border-r md:w-[300px] md:border-b-0 md:p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-50">
            Rating Categories
          </h3>
          <Select
            onValueChange={(v) => {
              console.log(v);
              setSelectedForm(v);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                className="text-gray-50"
                placeholder="Select a form"
              />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-gray-50">
              <SelectGroup>
                <SelectItem className="hover:bg-gray-700" value="1">
                  Search Engine Questionnaire
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="2">
                  Teach a topic
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="3">
                  Group discussion
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="4">
                  Google Spreadsheet
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="5">
                  Origami
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="6">
                  Team Task
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="7">
                  Punctuality
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="8">
                  Attendance
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="9">
                  Personality Type
                </SelectItem>
                <SelectItem className="hover:bg-gray-700" value="10">
                  Personal Suggestion
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className={"flex flex-col gap-2"}>
            <Button>
              <Link to={"/analytics"}>Foxian Analytics</Link>
            </Button>

            <Button>
              <Link to={"/Foxian"}>Add Foxian</Link>
            </Button> 
         
            <Button>
              <Link to={"/AddAttribute"}>Add Rating </Link>
            </Button>

            <Button>
              <Link to={"/AddTask"}>Add Task </Link>
            </Button>

            <Button>
              <a
                href="http://localhost:8080/swagger-ui/index.html#/"
                target="_blank"
              >
                Swagger UI
              </a>
            </Button>

            <Button
              onClick={() => {
                toast("Logged out successfully!🎆", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                localStorage.removeItem("authToken");
                window.location.href = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      {selectedForm == 1 ? (
        <SearchEngineQuestionnare />
      ) : selectedForm == 2 ? (
        <TeachATopic />
      ) : selectedForm == 3 ? (
        <GroupDiscussion />
      ) : selectedForm == 4 ? (
        <GoogleSpreadsheet />
      ) : selectedForm == 5 ? (
        <Origami />
      ) : selectedForm == 6 ? (
        <TeamTask />
      ) : selectedForm == 7 ? (
        <Punctuality />
      ) : selectedForm == 8 ? (
        <Attendance />
      ) : selectedForm == 9 ? (
        <PersonalityType />
      ) : (
        <PersonalSuggestion />
      )}

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
    </div>
  );
}
