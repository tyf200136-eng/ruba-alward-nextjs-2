import Nav from './components/Nav';
import ScrollFrameHero from './components/ScrollFrameHero';
import Rooms from './components/Rooms';
import Dining from './components/Dining';
import Location from './components/Location';
import Booking from './components/Booking';
import Footer from './components/Footer';
import FallingPetals from './components/FallingPetals';

export default function Page() {
  return (
    <>
      <FallingPetals />
      <Nav />
      <ScrollFrameHero />
      <Rooms />
      <Dining />
      <Location />
      <Booking />
      <Footer />
    </>
  );
}