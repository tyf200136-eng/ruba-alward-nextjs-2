import Nav from './components/Nav';
import ScrollFrameHero from './components/ScrollFrameHero';
import Rooms from './components/Rooms';
import Dining from './components/Dining';
import Location from './components/Location';
import Booking from './components/Booking';
import Footer from './components/Footer';
import RosePetalsOverlay from './components/RosePetalsOverlay';

export default function Page() {
  return (
    <>
      <Nav />
      <ScrollFrameHero />

      <RosePetalsOverlay>
        <Rooms />
        <Dining />
        <Location />
      </RosePetalsOverlay>

      <Booking />
      <Footer />
    </>
  );
}