import React, { useState, useEffect } from "react";
import styles from "./Home.module.css"
import data from "../../../src/assets/data/formStep.json"

const Home = () => {

    const [formData, setFormData] = useState<any>(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const updatedData = data.map((item: any) => {
            return {
                ...item,
                fields: item.fields.map((field: any) => {
                    return {
                        ...field,
                        value: "",
                        error: ''
                    }
                })
            }
        })
        setFormData(updatedData);
    }, []);

    const validateStep = (stepIndex: number): boolean => {
        
        console.log(stepIndex)
        let isValid : boolean = true;
         const updatedData = formData.map((item:any,index:number)=>{
                           
                  if(item.step==stepIndex+1)
                  {
                    return {
                        ...item,
                        fields : item.fields.map((field:any,index:number)=>{
                                 if(field.value=="")
                                 {
                                    isValid = false
                                 }
                                  return {
                                    ...field,
                                    error: field.value==""?'field is required':''
                                  }
                        })
                    }
                  }
                  return item;
         })

         setFormData(updatedData);
          
        return isValid;
    }
  
    const handleNextStep = () => {
          
          if(!validateStep(currentStep))
          {
              return;
          } 
        if (currentStep < formData.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }

   
         

    const handlePrevStep = () => {
        
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles["box"]}>
           <div className={styles["button-box"]}>
                <button onClick={()=> handlePrevStep()} className={styles['btn']}>
                    prev
                </button>
                </div>
            <div>
                <div className={styles["step-box"]}>
                    {formData[currentStep].fields.map((field: any, fieldIndex: number) => (
                        <div key={fieldIndex} className={styles["field-box"]}>
                            <label>{field.label}:</label>
                            <input
                                type={field.type}
                                value={field.value}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setFormData((prevData: any) => {
                                        const newData = [...prevData];
                                        newData[currentStep].fields[fieldIndex].value = newValue;
                                        return newData;
                                    });
                                }}
                            />
                            <span>
                                {field.error && <span className={styles["error"]}>{field.error}</span>}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles["button-box"]}>
                <button onClick={()=>handleNextStep()} className={styles['btn']}>
                   {
                    currentStep === formData.length - 1 ? "Submit" : "Next"
                   }
                </button>
                </div>
        </div>
    )
}

export default Home;
