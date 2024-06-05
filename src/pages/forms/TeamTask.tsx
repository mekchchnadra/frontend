// Frontend Changes
import { useState } from "react";
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
import { TeamTaskDTO } from "@/types/FormDTO";
import axiosInstance from "@/api/host";
import { internOptions } from "@/constants/internOptions";
import { ratingOptions } from "@/constants/ratingOptions";

export const TeamTask = () => {
  const [formData, setFormData] = useState<TeamTaskDTO>({
    internName: "",
    rating1: 0,
    rating2: 0,
    rating3: 0,
    rating4: 0,
    URL: "",
    remark: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    axiosInstance
      .post("user/submit-team-task", formData)
      .then((response) => {
        if (!response.data) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        console.log("Success:", data);
        window.alert("Team Task form submitted successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-50">Team Task</h1>
            <p className="text-gray-400">
              This form is designed to gather information about your experience
              with Team Task
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
                  setFormData((data) => {
                    return {
                      ...data,
                      internName: value,
                    };
                  })
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
              <Label className="text-gray-50" htmlFor="research-skills">
                Research Skills
              </Label>
              <Select
                id="research-skills"
                onValueChange={(value) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      rating1: +value,
                    };
                  })
                }
              >
                <SelectTrigger className="bg-gray-800 text-gray-50">
                  <SelectValue
                    className="text-gray-50"
                    placeholder="Select research skills"
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
              <Label className="text-gray-50" htmlFor="quality-of-work">
                Quality of Work
              </Label>
              <Select
                id="quality-of-work"
                onValueChange={(value) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      rating2: +value,
                    };
                  })
                }
              >
                <SelectTrigger className="bg-gray-800 text-gray-50">
                  <SelectValue
                    className="text-gray-50"
                    placeholder="Select quality of work"
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
              <Label className="text-gray-50" htmlFor="communication-skills">
                Communication Skills
              </Label>
              <Select
                id="communication-skills"
                onValueChange={(value) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      rating3: +value,
                    };
                  })
                }
              >
                <SelectTrigger className="bg-gray-800 text-gray-50">
                  <SelectValue
                    className="text-gray-50"
                    placeholder="Select communication skills"
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
              <Label className="text-gray-50" htmlFor="communication-skills">
                Planning & Problem Solving
              </Label>
              <Select
                id="communication-skills"
                onValueChange={(value) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      rating4: +value,
                    };
                  })
                }
              >
                <SelectTrigger className="bg-gray-800 text-gray-50">
                  <SelectValue
                    className="text-gray-50"
                    placeholder="Select communication skills"
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
            {/* New Input for URL */}
            <div>
              <Label className="text-gray-50" htmlFor="url">
                URL
              </Label>
              <input
                id="url"
                type="text"
                className="bg-gray-800 text-gray-50 w-full px-3 py-2 rounded-md"
                placeholder="Enter URL"
                value={formData.URL}
                onChange={(e) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      URL: e.target.value,
                    };
                  })
                }
              />
            </div>
            {/* New Textarea for Remark */}
            <div>
              <Label className="text-gray-50" htmlFor="remark">
                Remark
              </Label>
              <Textarea
                id="remark"
                className="bg-gray-800 text-gray-50 w-full rounded-md"
                placeholder="Enter remark"
                value={formData.remark}
                onChange={(e) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      remark: e.target.value,
                    };
                  })
                }
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
