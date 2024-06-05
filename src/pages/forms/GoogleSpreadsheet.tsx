import React, { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { GoogleSpreadsheetDTO } from "@/types/FormDTO";
import axiosInstance from "@/api/host";
import { internOptions } from "@/constants/internOptions";
import { ratingOptions } from "@/constants/ratingOptions";

export const GoogleSpreadsheet = () => {
  const [formData, setFormData] = useState<GoogleSpreadsheetDTO>({
    internName: "",
    rating1: 0,
    rating2: 0, // Assuming rating2 is for "Quality of Work"
    URL: "",
    remark: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axiosInstance
      .post("user/submit-google-spreadsheet", formData)
      .then((response) => {
        if (!response.data) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        console.log("Success:", data);
        window.alert("Google Spreadsheet form submitted successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddAttributes = () => {
    // Add logic for handling adding attributes
    // This function will be called when "Add Attributes" button is clicked
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-50">
              Google Spreadsheet
            </h1>
            <p className="text-gray-400">
              This form is designed to gather information about your experience
              with Google Spreadsheet.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label className="text-gray-50" htmlFor="intern-name">
                Foxian Name
              </Label>
              <Select
                id="intern-name"
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    internName: value,
                  }))
                }
              >
                <SelectTrigger className="bg-gray-800 text-gray-50">
                  <SelectValue
                    className="text-gray-50"
                    placeholder="Select intern name"
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-50">
                  {internOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      className="hover:bg-gray-700"
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-50" htmlFor="ability-to-learn-rating">
                Ability to Learn Rating
              </Label>
              <Select
                id="ability-to-learn-rating"
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    rating1: +value,
                  }))
                }
              >
                <SelectTrigger className="bg-gray-800 text-gray-50">
                  <SelectValue
                    className="text-gray-50"
                    placeholder="Select a rating"
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-50">
                  {ratingOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      className="hover:bg-gray-700"
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-50" htmlFor="quality-of-work-rating">
                Quality of Work Rating
              </Label>
              <Select
                id="quality-of-work-rating"
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    rating2: +value,
                  }))
                }
              >
                <SelectTrigger className="bg-gray-800 text-gray-50">
                  <SelectValue
                    className="text-gray-50"
                    placeholder="Select a rating"
                  />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-50">
                  {ratingOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      className="hover:bg-gray-700"
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
             {/*<div>
             <Button>
              <Link to={"/Foxian"}>Add Foxian</Link>
            </Button>
             </div>*/}            
             </div>
            <div>
              <Label className="text-gray-50" htmlFor="URL">
                URL
              </Label>
              <input
                type="text"
                id="URL"
                value={formData.URL}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    URL: e.target.value,
                  }))
                }
                className="bg-gray-800 text-gray-50 w-full p-2 rounded"
                placeholder="Enter URL"
              />
            </div>
            <div>
              <Label className="text-gray-50" htmlFor="remark">
                Remarks
              </Label>
              <Textarea
                className="bg-gray-800 text-gray-50"
                id="remark"
                value={formData.remark}
                onChange={(e) =>
                  setFormData((data) => ({
                    ...data,
                    remark: e.target.value,
                  }))
                }
                placeholder="Enter your remarks"
                rows={3}
              />
            </div>
            <Button
              className="w-full bg-gray-900 text-gray-50 hover:bg-gray-800 border border-white"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

