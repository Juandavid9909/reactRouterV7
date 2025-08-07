import { lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthLayout } from './auth/layout/AuthLayout';
import { LoginPage } from './auth/pages/LoginPage';
import { RegisterPage } from './auth/pages/RegisterPage';

const ChatLayout = lazy(() => import('./chat/layout/ChatLayout'));
const ChatPage = lazy(async () => import ('./chat/pages/ChatPage'));
const NoChatSelectedPage = lazy(async () => import('./chat/pages/NoChatSelectedPage'));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />} path="/auth">
                    <Route index element={<LoginPage />} />

                    <Route element={<RegisterPage />} path="/auth/register" />
                </Route>

                <Route
                    element={
                        <Suspense
                            fallback={
                                <div className="flex h-screen w-full items-center justify-center bg-background">
                                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                                </div>
                            }
                        >
                            <ChatLayout />
                        </Suspense>
                    }
                    path="/chat"
                >
                    <Route index element={<NoChatSelectedPage />} />

                    <Route element={<ChatPage />} path="/chat/:clientId" />
                </Route>

                <Route element={<Navigate to="/auth" />} path="/" />

                <Route element={<Navigate to="/auth" />} path="*" />
            </Routes>
        </BrowserRouter>
    );
};