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
import { TeachATopicDTO } from "@/types/FormDTO";
import axiosInstance from "@/api/host";
import { internOptions } from "@/constants/internOptions";
import { ratingOptions } from "@/constants/ratingOptions";

export const TeachATopic = () => {
  const [formData, setFormData] = useState<TeachATopicDTO>({
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
      .post("user/submit-teach-a-topic", formData)
      .then((response) => {
        if (!response.data) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        console.log("Success:", data);
        window.alert("Teach A Topic form submitted successfully");
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
            <h1 className="text-3xl font-bold text-gray-50">Teach A Topic</h1>
            <p className="text-gray-400">
              This form is designed to gather information about your experience
              with explaining concepts
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
              <Label className="text-gray-50" htmlFor="rating1">
                Responsibility
              </Label>
              <Select
                id="rating1"
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
              <Label className="text-gray-50" htmlFor="rating2">
                Research Skills
              </Label>
              <Select
                id="rating2"
                onValueChange={(value) =>
                  setFormData((data) => ({ ...data, rating2: +value }))
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
              <Label className="text-gray-50" htmlFor="rating3">
                Quality of Work
              </Label>
              <Select
                id="rating3"
                onValueChange={(value) =>
                  setFormData((data) => ({ ...data, rating3: +value }))
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
              <Label className="text-gray-50" htmlFor="rating4">
                Communication Skills
              </Label>
              <Select
                id="rating4"
                onValueChange={(value) =>
                  setFormData((data) => ({
                    ...data,
                    rating4: +value,
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
              <Label className="text-gray-50" htmlFor="URL">
                URL
              </Label>
              <input
                type="text"
                id="URL"
                value={formData.URL}
                onChange={(e) => {
                  console.log(e.target.value);
                  setFormData((val) => {
                    return {
                      ...val,
                      URL: e.target.value,
                    };
                  });
                }}
                className="bg-gray-800 text-gray-50 w-full p-2 rounded"
                placeholder="Enter URL"
              />
            </div>
            <div>
              <Label className="text-gray-50" htmlFor="remark">
                Remark
              </Label>
              <Textarea
                className="bg-gray-800 text-gray-50"
                id="remark"
                value={formData.remark}
                onChange={(e) => {
                  setFormData((data) => {
                    return {
                      ...data,
                      remark: e.target.value,
                    };
                  });
                }}
                placeholder="Enter your remark"
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
