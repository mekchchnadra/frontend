import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PersonalSuggestionDTO } from "@/types/FormDTO";
import axiosInstance from "@/api/host";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { internOptions } from "@/constants/internOptions";

export const PersonalSuggestion = () => {
  const [formData, setFormData] = useState<PersonalSuggestionDTO>({
    internName: "",
    personalDescription: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    axiosInstance
      .post("user/submit-personal-description", formData)
      .then((response) => {
        if (!response.data) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        console.log("Success:", data);
        window.alert("Personal Suggestion form submitted successfully");
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
            <h1 className="text-3xl font-bold text-gray-50">
              Personal Suggestion
            </h1>
            <p className="text-gray-400">
              This form is designed to gather information about your Personal
              Suggestion
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
              <Label className="text-gray-50" htmlFor="personal-description">
                Personal Suggestion
              </Label>
              <Textarea
                className="bg-gray-800 text-gray-50"
                id="personal-description"
                value={formData.personalDescription}
                onChange={(e) =>
                  setFormData((value) => {
                    return {
                      ...value,
                      personalDescription: e.target.value,
                    };
                  })
                }
                placeholder="Enter your suggestion"
                rows={5}
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
