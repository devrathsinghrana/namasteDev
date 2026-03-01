import { useState } from "react";

/*
.App {
  font-family: sans-serif;
  text-align: center;
}

.tab-form {
  border: 1px solid black;
}

.tabs-container {
  display: flex;
  padding: 5px;
}

.tab {
  border: 1px solid red;
  cursor: pointer;
}

.tab:hover {
  opacity: 0.5;
}

.tab:hover,
.tab.active {
  background-color: aquamarine;
}

.tab-form-body {
  border: 1px solid green;
  margin: 5px;
  height: 200px;
}

*/
const Profile = ({ data, setData, err }) => {
  const handleDataChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="profile-form tab-form-body">
      <div>
        <label>
          Name:
          <input
            name="name"
            value={data.name}
            type="text"
            onChange={handleDataChange}
          />
        </label>
        {err.name && <div>{err.name}</div>}
      </div>
      <div>
        <label>
          Age:
          <input
            name="age"
            value={data.age}
            type="number"
            onChange={handleDataChange}
          />
        </label>
        {err.age && <div>{err.age}</div>}
      </div>
      <div>
        <label>
          Email:
          <input
            name="email"
            value={data.email}
            type="email"
            onChange={handleDataChange}
          />
        </label>
        {err.email && <div>{err.email}</div>}
      </div>
    </div>
  );
};

const Interests = ({ data, setData, err }) => {
  const handleDataChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        interests: e.target.checked
          ? [...prev.interests, e.target.name]
          : prev.interests.filter((i) => i !== e.target.name),
      };
    });
  };

  return (
    <div className="setting-form tab-form-body">
      <div>
        <label>
          Coding
          <input
            name="coding"
            checked={data.interests.includes("coding")}
            type="checkbox"
            onChange={handleDataChange}
          />
        </label>
      </div>
      <div>
        <label>
          Swimming
          <input
            name="swimming"
            checked={data.interests.includes("swimming")}
            type="checkbox"
            onChange={handleDataChange}
          />
        </label>
      </div>
      <div>
        <label>
          Cycling
          <input
            name="cycling"
            checked={data.interests.includes("cycling")}
            type="checkbox"
            onChange={handleDataChange}
          />
        </label>
      </div>
      {err.interests && <div>{err.interests}</div>}
    </div>
  );
};

const Settings = ({ data, setData }) => {
  const handleDataChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        theme: e.target.name,
      };
    });
  };
  return (
    <div className="interest-form tab-form-body">
      <div>
        <label>
          Dark
          <input
            name="dark"
            checked={data.theme === "dark"}
            type="radio"
            onChange={handleDataChange}
          />
        </label>
      </div>
      <div>
        <label>
          Light
          <input
            name="light"
            checked={data.theme === "light"}
            type="radio"
            onChange={handleDataChange}
          />
        </label>
      </div>
    </div>
  );
};

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    interests: [],
    theme: "light",
  });
  const [err, setErr] = useState({});
  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const errObj = {};
        if (!data.name || data.name.length < 2) {
          errObj.name = "Name is invalid";
        }
        if (!data.email || data.email.length < 2) {
          errObj.email = "Email is invalid";
        }
        if (!data.age || data.age < 18) {
          errObj.age = "Age is invalid";
        }
        setErr({ ...errObj });
        return !errObj.name && !errObj.email && !errObj.age;
      },
    },
    {
      name: "Interests",
      component: Interests,
      validate: () => {
        const errObj = {};
        if (!data.interests || data.interests.length < 1) {
          errObj.interests = "Should select atleast one interest";
        }
        setErr({ ...errObj });
        return !errObj.interests;
      },
    },
    {
      name: "Settings",
      component: Settings,
      validate: () => {
        return true;
      },
    },
  ];
  const ActiveTabComponent = tabs[activeTab].component;
  const handlePrevClick = () => {
    if (tabs[activeTab].validate()) setActiveTab((prev) => prev - 1);
  };
  const handleNextClick = () => {
    if (tabs[activeTab].validate()) setActiveTab((prev) => prev + 1);
  };
  const handleSubmitClick = () => {
    console.log(data);
  };
  return (
    <div className="tab-form">
      <div className="tabs-container">
        {tabs.map((t, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => {
              if (tabs[activeTab].validate()) setActiveTab(index);
            }}
          >
            {t.name}
          </div>
        ))}
      </div>
      <ActiveTabComponent err={err} data={data} setData={setData} />
      <div>
        {activeTab !== 0 && <button onClick={handlePrevClick}>Prev</button>}
        {activeTab !== tabs.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmitClick}>Submit</button>
        )}
      </div>
    </div>
  );
};
export default function App() {
  return (
    <div className="App">
      <h1>Tab Form</h1>
      <TabForm />
    </div>
  );
}
