import React from "react";
import { styled } from "@mui/material/styles";
import {
  VendorData,
  TradingEntity,
  BusinessUnit,
  VendorType,
  YesNo,
} from "../../models/VendorTypes";
import { FormField } from "../ui/FormField";
import { TextInput } from "../ui/TextInput";
import { Dropdown } from "../ui/Dropdown";
import { Checkbox } from "../ui/Checkbox";

// Define Props
interface GeneralDetailsSectionProps {
  data: VendorData["generalDetails"];
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  onChange: (field: string, value: any) => void;
  onCheckboxChange: (field: string, value: string, checked: boolean) => void;
  onBlur: (field: string) => void;
  parentVendors?: Array<{ id: string; name: string; email: string }>;
}

// Styled Container
const SectionContainer = styled("div")({
  background: "#f7f7f7",
  padding: "20px",
  margin: "10px 0",
  borderRadius: "8px",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
  width: "100%",
});

const SectionTitle = styled("h2")({
  fontSize: "1.2em",
  color: "rgb(31, 31, 35)",
  fontWeight: 600,
  marginBottom: "10px",
  marginTop: "10px",
});

const FormLegend = styled("legend")({
  fontFamily:
    '-apple-system, "system-ui", "Segoe UI", Roboto, Oxygen, Ubuntu, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontSize: "24px",
  fontWeight: 800,
  color: "rgb(31, 31, 35)",
  marginBottom: "20px",
});

const CheckboxContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "15px",
});

const CheckboxColumn = styled("div")({
  flex: "1 1 33%",
  minWidth: "250px",
});

// Trading entities data
const tradingEntities: Array<{ id: TradingEntity; label: string }> = [
  { id: "ALAW", label: "The Trustee for Lagardere / AWPL Trust (ALAW)" },
  {
    id: "AUDF",
    label: "Duty Free Stores Australia Pty Ltd (AUDF) (CNS T1 stores only)",
  },
  { id: "AUTE", label: "Newslink Pty Ltd (AUTE) (CNS T1 stores only)" },
  { id: "NZAW", label: "AWPL Retail Solutions Ltd (NZAW)" },
  { id: "AUPG", label: "The Purely Group Pty Ltd (AUPG)" },
  { id: "AUAW", label: "The Trustee for AWPL Tango Trust (AUAW)" },
  { id: "NZDF", label: "Duty Free Stores Wellington Ltd (NZDF)" },
  { id: "NZTE", label: "LS Travel Retail New Zealand Ltd (NZTE)" },
  { id: "LSAP", label: "Lagardere Services Asia Pacific Pty Ltd (LSAP)" },
];

// Business unit options
const businessUnitOptions = [
  { value: "", label: "Select an option", disabled: true },
  { value: "Travel Essentials", label: "Travel Essentials" },
  { value: "Food Services", label: "Food Services" },
  { value: "Specialty", label: "Specialty" },
  { value: "Duty Free", label: "Duty Free" },
  { value: "Finance", label: "Finance" },
  { value: "IT", label: "IT" },
];

// Vendor type options
const vendorTypeOptions = [
  { value: "", label: "Select an option", disabled: true },
  { value: "STOCK", label: "Stock" },
  { value: "OVERHEADS", label: "Overheads" },
  { value: "OVERHEADANDSTOCK", label: "Overhead and Stock" },
];

// Yes/No options
const yesNoOptions = [
  { value: "", label: "Select an option", disabled: true },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

// Component
export const GeneralDetailsSection: React.FC<GeneralDetailsSectionProps> = ({
  data,
  errors,
  touched,
  onChange,
  onCheckboxChange,
  onBlur,
  parentVendors = [],
}) => {
  // Handle parent vendor options
  const parentVendorOptions = [
    { value: "", label: "Select a parent vendor", disabled: true },
    ...parentVendors.map((vendor) => ({
      value: vendor.email,
      label: `${vendor.name} (${vendor.email})`,
    })),
  ];

  return (
    <SectionContainer>
      <FormLegend>Vendor Account Set Up Form</FormLegend>
      <SectionTitle>1. General Details</SectionTitle>

      {/* Trading Entities */}
      <FormField
        label="Select Trading Entity(ies)"
        htmlFor="tradingEntities"
        required
        error={errors.tradingEntities}
        touched={touched["generalDetails.tradingEntities"]}
      >
        <CheckboxContainer>
          {tradingEntities.map((entity, index) => (
            <CheckboxColumn key={entity.id}>
              <Checkbox
                id={entity.id}
                name="tradingEntities"
                value={entity.id}
                checked={data.tradingEntities.includes(entity.id)}
                onChange={(e) =>
                  onCheckboxChange(
                    "tradingEntities",
                    entity.id,
                    e.target.checked
                  )
                }
                label={entity.label}
              />
            </CheckboxColumn>
          ))}
        </CheckboxContainer>
      </FormField>

      {/* Vendor Home Country */}
      <FormField
        label="Vendor Home Country"
        htmlFor="vendorHomeCountry"
        required
        error={errors.vendorHomeCountry}
        touched={touched["generalDetails.vendorHomeCountry"]}
      >
        <Dropdown
          id="vendorHomeCountry"
          name="vendorHomeCountry"
          value={data.vendorHomeCountry}
          onChange={(e) => onChange("vendorHomeCountry", e.target.value)}
          onBlur={() => onBlur("vendorHomeCountry")}
          options={[
            { value: "", label: "Select an option", disabled: true },
            // Just showing a few countries for brevity
            { value: "Australia", label: "Australia" },
            { value: "New Zealand", label: "New Zealand" },
            {
              value: "United States of America",
              label: "United States of America",
            },
            { value: "United Kingdom", label: "United Kingdom" },
            { value: "China", label: "China" },
            { value: "Japan", label: "Japan" },
            // Add more countries as needed
          ]}
          required
          error={
            !!errors.vendorHomeCountry &&
            touched["generalDetails.vendorHomeCountry"]
          }
        />
      </FormField>

      {/* Primary Trading Business Unit */}
      <FormField
        label="Primary Trading Business Unit"
        htmlFor="primaryTradingBusinessUnit"
        required
        error={errors.primaryTradingBusinessUnit}
        touched={touched["generalDetails.primaryTradingBusinessUnit"]}
      >
        <Dropdown
          id="primaryTradingBusinessUnit"
          name="primaryTradingBusinessUnit"
          value={data.primaryTradingBusinessUnit}
          onChange={(e) =>
            onChange("primaryTradingBusinessUnit", e.target.value)
          }
          onBlur={() => onBlur("primaryTradingBusinessUnit")}
          options={businessUnitOptions}
          required
          error={
            !!errors.primaryTradingBusinessUnit &&
            touched["generalDetails.primaryTradingBusinessUnit"]
          }
        />
      </FormField>

      {/* Email */}
      <FormField
        label="Email"
        htmlFor="email"
        required
        error={errors.email}
        touched={touched["generalDetails.email"]}
      >
        <TextInput
          id="email"
          name="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          onBlur={() => onBlur("email")}
          placeholder="example@domain.com"
          type="email"
          pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
          title="Please enter a valid email address (e.g., example@domain.com)"
          required
          error={!!errors.email && touched["generalDetails.email"]}
        />
      </FormField>

      {/* Business Name */}
      <FormField
        label="Business Name"
        htmlFor="businessName"
        required
        error={errors.businessName}
        touched={touched["generalDetails.businessName"]}
      >
        <TextInput
          id="businessName"
          name="businessName"
          value={data.businessName}
          onChange={(e) => onChange("businessName", e.target.value)}
          onBlur={() => onBlur("businessName")}
          required
          error={
            !!errors.businessName && touched["generalDetails.businessName"]
          }
        />
      </FormField>

      {/* Vendor Type */}
      <FormField
        label="Vendor Type"
        htmlFor="vendorType"
        required
        error={errors.vendorType}
        touched={touched["generalDetails.vendorType"]}
      >
        <Dropdown
          id="vendorType"
          name="vendorType"
          value={data.vendorType}
          onChange={(e) => onChange("vendorType", e.target.value)}
          onBlur={() => onBlur("vendorType")}
          options={vendorTypeOptions}
          required
          error={!!errors.vendorType && touched["generalDetails.vendorType"]}
        />
      </FormField>

      {/* Child Vendor */}
      <FormField
        label="Child Vendor"
        htmlFor="childVendor"
        required={false}
        error={errors.childVendor}
        touched={touched["generalDetails.childVendor"]}
      >
        <Dropdown
          id="childVendor"
          name="childVendor"
          value={data.childVendor || ""}
          onChange={(e) => onChange("childVendor", e.target.value)}
          onBlur={() => onBlur("childVendor")}
          options={yesNoOptions}
          error={!!errors.childVendor && touched["generalDetails.childVendor"]}
        />
      </FormField>

      {/* Parent Vendor - only if childVendor is 'yes' */}
      {data.childVendor === "yes" && (
        <FormField
          label="Parent Vendor"
          htmlFor="parentVendor"
          required
          error={errors.parentVendor}
          touched={touched["generalDetails.parentVendor"]}
        >
          <Dropdown
            id="parentVendor"
            name="parentVendor"
            value={data.parentVendor || ""}
            onChange={(e) => onChange("parentVendor", e.target.value)}
            onBlur={() => onBlur("parentVendor")}
            options={parentVendorOptions}
            required={data.childVendor === "yes"}
            error={
              !!errors.parentVendor && touched["generalDetails.parentVendor"]
            }
          />
        </FormField>
      )}
    </SectionContainer>
  );
};

export default GeneralDetailsSection;
