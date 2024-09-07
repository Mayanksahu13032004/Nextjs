// // 'use client'
// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { useForm } from "react-hook-form"
// // import * as z  from "zod"
// // import Link from "next/link"
// // import { useEffect, useState } from "react"
// // import {useDebounceValue} from 'usehooks-ts'
// // import { useToast } from "@/hooks/use-toast"
// // import { useRouter } from "next/router"
// // import { signUpSchema } from "@/schemas/signUpSchema"
// // import Email from "next-auth/providers/email"
// // import axios, {AxiosError} from 'axios'
// // import { ApiResponse } from "@/types/ApiResponse"
// // // import { Form } from "react-hook-form"
// // import {   Form, FormField, FormItem, FormLabel,FormMessage, } from "react-hook-form"

// // function page() {
// //   const [username,setUername]=useState('')
// //   const [usernameMessage,setUernameMessage]=useState('')
// //   const [isCheckingUsername,setisCheckingUsername]=useState(false)
// //   const [isSubmitting,setIsSubmitting]=useState(false)

// //   const debouncedUsername= useDebounceValue(username,300)
// //   const { toast } = useToast()
// //   const router=useRouter();

// //   // zod iplementation
// //   const form=useForm<z.infer<typeof signUpSchema>>({
// //     resolver:zodResolver(signUpSchema),
// //     defaultValues:{
// //       username:'',
// //       email:'',
// //       password:''
// //     }
// //   })

// //   useEffect(()=>{
// //       const checkUsernameUnique=async ()=>{
// //         if(debouncedUsername){
// //           setisCheckingUsername(true)
// //           setUernameMessage('')
// //           try {
// //             const response= await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
// //             setUernameMessage(response.data.message)
// //           } catch (error) {
// //             const  AxiosError=error as AxiosError<ApiResponse>;
// //             setUernameMessage(
// //               AxiosError.response?.data.message ?? "Error checking username"
// //             )
// //           }finally{
// //             setisCheckingUsername(false)
// //           }
// //         }
// //       }
// //       checkUsernameUnique()
// //   },[debouncedUsername])


// //   const onSubmit=async(data:Zod.infer<typeof signUpSchema>)=>{
// //       setIsSubmitting(true)
// //       try {
// //         const response= await axios.post<ApiResponse>('/api/sign-up',data)
// //         toast({
// //           title:"Success",
// //           description:response.data.message
// //         })
// //         router.replace(`/verify/${username}`)
// //         setIsSubmitting(false)
// //       } catch (error) {
// //         console.error("Error in sign up of user",error);
// //         const  AxiosError=error as AxiosError<ApiResponse>;
// //             let errorMessage=AxiosError.response?.data.message
// //             toast({
// //               title:"Sign up failed",
// //               description:errorMessage,
// //               variant:"destructive"
// //             })
// //             setIsSubmitting(false)
        
// //       }
// //   }

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gray-800">
// //     <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
// //       <div className="text-center">
// //         <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
// //           Welcome Back to True Feedback
// //         </h1>
// //         <p className="mb-4">Sign in to continue your secret conversations</p>
// //       </div>
// //       <Form {...form}>
// //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// //           <FormField
// //             name="identifier"
// //             control={form.control}
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Email/Username</FormLabel>
// //                 <Input {...field} />
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <FormField
// //             name="password"
// //             control={form.control}
// //             render={({ field }) => (
// //               <FormItem>
// //                 <FormLabel>Password</FormLabel>
// //                 <Input type="password" {...field} />
// //                 <FormMessage />
// //               </FormItem>
// //             )}
// //           />
// //           <Button className='w-full' type="submit">Sign In</Button>
// //         </form>
// //       </Form>
// //       <div className="text-center mt-4">
// //         <p>
// //           Not a member yet?{' '}
// //           <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
// //             Sign up
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   </div>
// //   )
// // }

// // export default page













// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';
// import { signIn } from 'next-auth/react';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/hooks/use-toast';

// import { signInSchema } from '@/schemas/signInSchema';

// export default function SignInForm() {
//   const router = useRouter();

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       identifier: '',
//       password: '',
//     },
//   });

//   const { toast } = useToast();
//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//     const result = await signIn('credentials', {
//       redirect: false,
//       identifier: data.identifier,
//       password: data.password,
//     });

//     if (result?.error) {
//       if (result.error === 'CredentialsSignin') {
//         toast({
//           title: 'Login Failed',
//           description: 'Incorrect username or password',
//           variant: 'destructive',
//         });
//       } else {
//         toast({
//           title: 'Error',
//           description: result.error,
//           variant: 'destructive',
//         });
//       }
//     }

//     if (result?.url) {
//       router.replace('/dashboard');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Welcome Back to True Feedback
//           </h1>
//           <p className="mb-4">Sign in to continue your secret conversations</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="identifier"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email/Username</FormLabel>
//                   <Input {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <Input type="password" {...field} />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button className='w-full' type="submit">Sign In</Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Not a member yet?{' '}
//             <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === 'Username is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} name="email" />
                  <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}