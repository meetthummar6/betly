import React, { createContext, useContext, useEffect, useState,useCallback,useMemo} from 'react';
import Api from '../axios/Api';

interface User{
    username:string,
    email:string,
    balance:number,
    _id:string
}

interface AuthContextType{
    user: User | null;
    loading: boolean;
    login:(Credentials: {
        username: string;
        password: string
    })=> Promise<void>;
    logout:()=> Promise<void>
}

const AuthContext= createContext<AuthContextType | undefined>(undefined);


export const AuthProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [user,setUser] = useState<User | null>(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const fetchUser = async()=>{
                await Api.get('/users/current-user').then(
                    (res)=>setUser(res.data.data)
                        ).catch(
                            ()=>{
                                setUser(null);
                                console.clear();
                            }
                        ).finally(
                            ()=>setLoading(false)
                        );
                }
                fetchUser();
        },[]);

    const login = useCallback(async (Credentials:{
        username:string,
        password: string
    })=>{
        const res=await Api.post('users/login',Credentials);
        setUser(res.data.data.user);
    },[]);

    const logout =useCallback(async ()=>{
        await Api.post('users/logout');
        setUser(null);
    },[]);

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            logout
        }),[user,loading,login,logout]);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = ()=>{
    const ctx=useContext(AuthContext);
    if(!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
