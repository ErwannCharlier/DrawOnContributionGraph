"use client";
import { useState } from "react";
import Step1 from "../components/Step1/Step1";
import Step2 from "../components/Step2/Step2";
import Step3 from "../components/Step3/Step3";
import Header from "../components/Homepage/Header";
import { validateInputs } from "../API/api";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector"; // Import stepConnectorClasses
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

enum StepEnum {
    Step1 = 1,
    Step2,
    Step3,
}

const steps = ["Create a public repository", "Create a token", "Draw"];

const headerContent = {
    [StepEnum.Step1]: {
        title: "Step 1",
        description: "Create a public repository",
        subtitle: "",
    },
    [StepEnum.Step2]: {
        title: "Step 2",
        description: "Create a token",
        subtitle: "",
    },
    [StepEnum.Step3]: {
        title: "Step 3",
        description: "Draw",
        subtitle: "",
    },
};

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ffffff",
        },
        secondary: {
            main: "#1F6FEB",
        },
        background: {
            default: "#000000",
        },
    },
    components: {
        MuiStepper: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",
                },
                alternativeLabel: {
                    color: "white",
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    color: "#ffffff",
                },
            },
        },
    },
});

const AnimatedStepConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
        transition: "border-color 0.6s ease-in-out",
    },
    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
        borderColor: "#ffffff",
        transition: "color 0.6s ease-in-out",
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
        borderColor: "#ffffff",
    },
}));

export default function Steps() {
    const [step, setStep] = useState<StepEnum>(StepEnum.Step1);
    const [repoUrl, setRepoUrl] = useState("");
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");

    const { title, description, subtitle } = headerContent[step];

    const validateInput = async () => {
        const year = "2024";
        return await validateInputs({
            token,
            repository: repoUrl,
            email,
            year,
        });
    };

    const renderStepComponent = () => {
        switch (step) {
            case StepEnum.Step1:
                return <Step1 setStep={setStep} setRepoUrl={setRepoUrl} />;
            case StepEnum.Step2:
                return (
                    <Step2
                        setStep={setStep}
                        setEmail={setEmail}
                        setToken={setToken}
                        validateInputs={validateInput}
                    />
                );
            case StepEnum.Step3:
                return <Step3 token={token} email={email} repoUrl={repoUrl} />;
            default:
                return null;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <>
                <Header title={title} description={description} subtitle={subtitle} />

                <div className={styles.container}>
                    {renderStepComponent()}

                    <Box sx={{ width: "50%", marginTop: 5, maxWidth: "1200px" }}>
                        <Stepper
                            activeStep={step - 1}
                            alternativeLabel
                            connector={<AnimatedStepConnector />} // Use the custom connector here
                        >
                            {steps.map((label, index) => (
                                <Step key={index}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </div>
            </>
        </ThemeProvider>
    );
}
