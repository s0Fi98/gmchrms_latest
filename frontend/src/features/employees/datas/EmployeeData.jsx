import React from "react";
import InputField from "../../../components/common/input/InputField";
import SelectField from "../../../components/common/select/SelectField";
import TextAreaField from "../../../components/common/textarea/TextArea";
import RadioButton from "../../../components/common/radio/RadioButton";
import Checkbox from "../../../components/common/checkbox/checkbox";
import Button from "../../../components/common/button/Button";
import Table from "../../../components/common/table/Table";
import StatusBadge from "../../../components/common/table/Table";

const EmployeeData = () => {
  return (
    <div>
      <InputField
        label="Employee ID"
        id="employeeId"
        type="text"
        value=""
        onChange={() => {}}
      />
      <SelectField
        label="Department"
        id="department"
        value=""
        onChange={() => {}}
        options={[
          { value: "it", label: "IT" },
          { value: "hr", label: "HR" },
          { value: "finance", label: "Finance" },
        ]}
      />

      <TextAreaField
        label="Address"
        id="address"
        value=""
        onChange={() => {}}
        rows={4}
      />

      <RadioButton
        label="Gender"
        name="gender"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
        value=""
        onChange={() => {}}
      />

      <Checkbox
        label="I agree to the terms and conditions"
        id="terms"
        checked={false}
        onChange={() => {}}
      />

      <Button
        variant="primary"
        icon={
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        }
      >
        Add new
      </Button>

      <Table
        columns={[
          { key: "empId", label: "Employee ID", sortable: true },
          { key: "name", label: "Name", sortable: true },
          { key: "ward", label: "Ward", sortable: true },
          {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: "actions",
            label: "",
            render: (row) => (
              <button
                className="text-blue-600 hover:underline"
                onClick={() => handleEdit(row)}
              >
                Edit
              </button>
            ),
          },
        ]}
        data={[
          {
            id: 1,
            empId: "GMC-0451",
            name: "R. Baruah",
            ward: "Zone 2",
            status: "active",
          },
          {
            id: 2,
            empId: "GMC-0452",
            name: "M. Das",
            ward: "Zone 1",
            status: "pending",
          },
        ]}
        onRowClick={(row) => console.log(row)}
      />
    </div>
  );
};

export default EmployeeData;
