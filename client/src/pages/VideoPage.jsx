import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from '../constant.js';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const roomID = id || 'defaultRoom';
  const username = localStorage.getItem('username') || 'Expert';
  const meetingInitialized = useRef(false);
  const zpInstance = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize meeting only once
    if (meetingInitialized.current || !containerRef.current) return;

    const initializeMeeting = async () => {
      try {
        meetingInitialized.current = true;
        
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          APP_ID,
          SERVER_SECRET,
          roomID,
          Date.now().toString(),
          username
        );

        zpInstance.current = ZegoUIKitPrebuilt.create(kitToken);
        
        zpInstance.current.joinRoom({
          container: containerRef.current,
          maxUsers: 10,
          sharedLinks: [
            {
              name: 'Copy link',
              url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showPreJoinView: true,
          showLeaveBtn: true,
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
        });
      } catch (error) {
        console.error('Error initializing video call:', error);
        meetingInitialized.current = false;
      }
    };

    initializeMeeting();

    // Cleanup function
    return () => {
      if (zpInstance.current) {
        zpInstance.current.destroy();
        zpInstance.current = null;
      }
      meetingInitialized.current = false;
    };
  }, [roomID, username]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-white dark:bg-slate-900 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 text-center dark:text-white">
                Expert Video Call
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Room: {roomID} | User: {username}
              </p>
            </div>
            
            <div className="w-24"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div 
              ref={containerRef}
              className="w-full h-[65vh] min-h-[500px]"
            />
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Call Controls
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Room ID</p>
                <p className="font-medium text-gray-800 dark:text-white">{roomID}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`
                    );
                    alert('Call link copied to clipboard!');
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Copy Invite Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideoPage;