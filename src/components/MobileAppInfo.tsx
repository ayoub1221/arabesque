
import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const MobileAppInfo = () => {
  return (
    <Card className="w-full max-w-md mx-auto my-4 bg-white/90 backdrop-blur-sm border border-ballet-lavender/30">
      <CardHeader>
        <CardTitle className="text-ballet-dark text-center">تطبيق أرابيسك فلو</CardTitle>
        <CardDescription className="text-center">
          مرحباً بك في تطبيق أرابيسك فلو للجوال
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-ballet-light p-4 text-sm">
          <p className="mb-2 font-medium text-ballet-dark">مميزات التطبيق:</p>
          <ul className="space-y-2 list-disc list-inside text-gray-600">
            <li>جدولة تمارين الباليه الخاصة بك</li>
            <li>الوصول إلى كتالوج التمارين الشامل</li>
            <li>تتبع تقدمك في التمارين</li>
            <li>معلومات عن الجسم والتغذية المناسبة</li>
          </ul>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>هذا التطبيق يعمل على أجهزة iOS و Android ويمكنك الوصول إلى كافة المميزات حتى بدون اتصال بالإنترنت.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-ballet-purple hover:bg-ballet-dark">ابدأ الاستخدام</Button>
      </CardFooter>
    </Card>
  );
};

export default MobileAppInfo;
