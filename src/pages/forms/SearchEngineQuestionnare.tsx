import {useEffect, useState} from "react";
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
import { SearchEngineQuestionnareDTO } from "@/types/FormDTO";
import axiosInstance from "@/api/host";
import { ratingOptions } from "@/constants/ratingOptions";

export const SearchEngineQuestionnare = () => {
  const [formData, setFormData] = useState<SearchEngineQuestionnareDTO>({
    internName: "",
    rating1: 0,
    rating2: 0,
    rating3: 0,
    URL: "",
    remark: "",
  });

  const [foxianNames, setFoxianNames] = useState<string[]>([]);

  useEffect(() => {
    axiosInstance
        .get("/api/v1/details/get-all-foxian-names")
        .then((response) => {
          setFoxianNames(response.data.map((foxian: { name: string }) => foxian.name));
        })
        .catch((error) => {
          console.error("Error fetching foxian names:", error);
        });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formData);
    axiosInstance
      .post("user/submit-search-engine-questionnaire", formData)
      .then((response) => {
        if (!response.data) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        console.log("Success:", data);
        window.alert("Search Engine Questionnaire form submitted successfully");
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
              Search Engine Questionnaire
            </h1>
            <p className="text-gray-400">
              This form is designed to gather information about your experience
              with search engines.
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
                  {foxianNames.map((name, index) => (
                      <SelectItem
                          key={index}
                          className="hover:bg-gray-700"
                          value={name}
                      >
                        {name}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-50" htmlFor="responsibility-rating">
                Responsibility Rating
              </Label>
              <Select
                id="responsibility-rating"
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
              <Label className="text-gray-50" htmlFor="research-skills-rating">
                Research Skills Rating
              </Label>
              <Select
                id="research-skills-rating"
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
                onChange={(e) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      URL: e.target.value,
                    };
                  })
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
                  setFormData((data) => {
                    return {
                      ...data,
                      remark: e.target.value,
                    };
                  })
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
