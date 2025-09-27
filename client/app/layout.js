export const metadata = {
  title: "Bangalore Home Price Predictor",
  description: "Estimate house prices using ML + Flask backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
