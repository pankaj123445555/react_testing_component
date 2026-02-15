import { useState } from "react"
import styles from "./Search.module.css"

const SearchComponent = () => {

  const [user,setUser] = useState<any>(null);

  const onSubmit = async () => {
    if (!user.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/user/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log("All users:", data.users);
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

    return (
        <div className={styles.searchComponent}>
          <div>
            <input onChange={(e)=>setUser(e.target.value)} className={styles["input-box"]} type="text"/>
          </div>
          <button className={styles["submit-btn"]} onClick={()=> onSubmit()}>Submit</button>
             </div>
    )
}
  
export default SearchComponent;