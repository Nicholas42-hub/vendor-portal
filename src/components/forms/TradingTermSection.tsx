import React from "react";
import { styled } from "@mui/material/styles";
import { VendorData, VendorType } from "../../models/VendorTypes";
import { FormField } from "../ui/FormField";
import { TextInput } from "../ui/TextInput";
import { Dropdown } from "../ui/Dropdown";
import { SectionContainer, SectionTitle } from "../ui/FormLayout";
// Define Props
interface TradingTermsSectionProps {
  data: VendorData["tradingTerms"];
  vendorType: VendorType;
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
}

// Yes/No options
const yesNoOptions = [
  { value: "", label: "Select an option", disabled: true },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

// Component
export const TradingTermsSection: React.FC<TradingTermsSectionProps> = ({
  data,
  vendorType,
  errors,
  touched,
  onChange,
  onBlur,
}) => {
  // Show quotes section only for OVERHEADS or OVERHEADANDSTOCK
  const showQuotesSection =
    vendorType === "OVERHEADS" || vendorType === "OVERHEADANDSTOCK";

  // Show back order only for STOCK or OVERHEADANDSTOCK
  const showBackOrder =
    vendorType === "STOCK" || vendorType === "OVERHEADANDSTOCK";

  return (
    <SectionContainer>
      <SectionTitle>2. Trading Terms</SectionTitle>

      {/* Quotes Obtained - only for OVERHEADS or OVERHEADANDSTOCK */}
      {showQuotesSection && (
        <FormField
          label="Have 2 quotes been obtained?"
          htmlFor="quotesObtained"
          required
          error={errors.quotesObtained}
          touched={touched["tradingTerms.quotesObtained"]}
        >
          <Dropdown
            id="quotesObtained"
            name="quotesObtained"
            value={data.quotesObtained}
            onChange={(e) => onChange("quotesObtained", e.target.value)}
            onBlur={() => onBlur("quotesObtained")}
            options={yesNoOptions}
            required={showQuotesSection}
            error={
              !!errors.quotesObtained && touched["tradingTerms.quotesObtained"]
            }
          />
        </FormField>
      )}

      {/* Reason for no quotes - only if quotesObtained is 'no' */}
      {showQuotesSection && data.quotesObtained === "no" && (
        <FormField
          label="If no, please provide a reason"
          htmlFor="quotesObtainedReason"
          required
          error={errors.quotesObtainedReason}
          touched={touched["tradingTerms.quotesObtainedReason"]}
        >
          <TextInput
            id="quotesObtainedReason"
            name="quotesObtainedReason"
            value={data.quotesObtainedReason || ""}
            onChange={(e) => onChange("quotesObtainedReason", e.target.value)}
            onBlur={() => onBlur("quotesObtainedReason")}
            required={data.quotesObtained === "no"}
            error={
              !!errors.quotesObtainedReason &&
              touched["tradingTerms.quotesObtainedReason"]
            }
          />
        </FormField>
      )}

      {/* Back Order - only for STOCK or OVERHEADANDSTOCK */}
      {showBackOrder && (
        <FormField
          label="Allow Back Order"
          htmlFor="backOrder"
          required={false}
          error={errors.backOrder}
          touched={touched["tradingTerms.backOrder"]}
        >
          <Dropdown
            id="backOrder"
            name="backOrder"
            value={data.backOrder || ""}
            onChange={(e) => onChange("backOrder", e.target.value)}
            onBlur={() => onBlur("backOrder")}
            options={yesNoOptions}
            error={!!errors.backOrder && touched["tradingTerms.backOrder"]}
          />
        </FormField>
      )}
    </SectionContainer>
  );
};
