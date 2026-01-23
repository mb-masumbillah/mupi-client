"use server"

import departments from "@/public/departments.json";

export const getDepartment = (id:string) =>{
    const department =  departments.find((dep) => dep.id === id);

    console.log({department})
    return department
}