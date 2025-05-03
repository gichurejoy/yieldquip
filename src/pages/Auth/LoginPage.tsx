
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import YieldQuipLogo from "@/components/YieldQuipLogo";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showRegister = searchParams.get("register") === "true";
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"login" | "register">(showRegister ? "register" : "login");
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoggingIn(true);
    
    // Simulate login delay
    setTimeout(() => {
      // This is a demo login - in a real app, you'd use authentication service
      if (loginEmail === "demo@example.com" && loginPassword === "password") {
        toast({
          title: "Login Successful",
          description: "Welcome back to YieldQuip!",
        });
        navigate("/");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. For demo, use demo@example.com / password",
          variant: "destructive",
        });
        setIsLoggingIn(false);
      }
    }, 1000);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords you entered do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsRegistering(true);
    
    // Simulate registration delay
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Account created successfully. You can now log in.",
      });
      setActiveTab("login");
      setLoginEmail(registerEmail);
      setIsRegistering(false);
      
      // Clear registration form
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
    }, 1500);
  };
  
  const handleForgotPassword = () => {
    if (!loginEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reset Link Sent",
      description: "If an account exists with this email, you'll receive a password reset link",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Header */}
      <header className="pt-6 px-4">
        <div className="container mx-auto flex items-center">
          <Button 
            variant="ghost" 
            className="flex items-center gap-1"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 container mx-auto flex flex-col justify-center items-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <YieldQuipLogo className="h-10 w-10" />
              <span className="ml-2 text-2xl font-bold text-primary">YieldQuip</span>
            </div>
          </div>
          
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl">Welcome</CardTitle>
              <CardDescription>
                {activeTab === "login" 
                  ? "Sign in to your account to continue" 
                  : "Create a new account to get started"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@example.com" 
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-xs"
                            onClick={handleForgotPassword}
                            type="button"
                          >
                            Forgot password?
                          </Button>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoggingIn}>
                        {isLoggingIn ? "Signing In..." : "Sign In"}
                      </Button>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        <span>Don't have an account? </span>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto"
                          onClick={() => setActiveTab("register")}
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="John Doe" 
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="name@example.com" 
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input 
                          id="register-password" 
                          type="password" 
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={registerConfirmPassword}
                          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isRegistering}>
                        {isRegistering ? "Creating Account..." : "Create Account"}
                      </Button>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        <span>Already have an account? </span>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto"
                          onClick={() => setActiveTab("login")}
                        >
                          Sign In
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-6 pb-3 text-xs text-muted-foreground text-center flex justify-center">
              <p>By continuing, you agree to YieldQuip's Terms of Service and Privacy Policy.</p>
            </CardFooter>
          </Card>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo account: demo@example.com / password</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        <div className="container mx-auto">
          <p>© 2025 YieldQuip. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
