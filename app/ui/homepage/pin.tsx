'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { update } from '@/app/store/pin-context';

export default function Pin({
  defined,
  definePin,
  validatePin,
}: {
  defined: boolean;
  definePin: (pin: string) => {};
  validatePin: (pin: string) => {};
}) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(undefined);
  const dispatch = useDispatch();
  const { push } = useRouter();

  let title = '';
  if (defined) {
    title = 'Introduza o PIN';
  } else {
    title = 'Defina o seu PIN';
  }

  useEffect(() => {
    const definePinHandler = async () => {
      if (pin.indexOf('') === -1) {
        if (defined) {
          const success = await validatePin(pin.join(''));
          if (success) {
            dispatch(update(pin.join('')));
            setPin(['', '', '', '']);
            push('/dashboard');
          } else {
            setPin(['', '', '', '']);
            setError('PIN inválido');
          }
        } else {
          const success = await definePin(pin.join(''));
          if (success) {
            setPin(['', '', '', '']);
          }
        }
      } else if (pin.indexOf('') === 1) {
        setError(undefined);
      }
    };

    definePinHandler();
  }, [pin]);

  const handleDigitClick = (digit) => {
    const newPin = [...pin];
    const emptyIndex = newPin.indexOf('');

    if (emptyIndex !== -1) {
      newPin[emptyIndex] = digit;
      setPin(newPin);
    }
  };

  const handleBackspaceClick = () => {
    const newPin = [...pin];
    const lastIndex = newPin.indexOf('');

    if (lastIndex !== 0 && lastIndex !== -1) {
      newPin[lastIndex - 1] = '';
      setPin(newPin);
    } else if (lastIndex === -1) {
      newPin[newPin.length - 1] = '';
      setPin(newPin);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-[50vh] w-[35%] flex-col items-center justify-center rounded-xl bg-white p-4 drop-shadow-md">
        <h1 className="mb-2 text-center text-xl font-normal">{title}</h1>
        {error ? (
          <p className="pb-4 text-red-500">{error}</p>
        ) : (
          <div className="mb-6" />
        )}
        <div className="flex flex-col items-center">
          <div className="mb-6 flex space-x-6">
            {pin.map((digit, index) => (
              <div key={index} className="text-center">
                {digit != '' ? (
                  <div className="h-3 w-3 rounded-full bg-black"></div>
                ) : (
                  <div className="h-3 w-3 rounded-full border border-solid border-black"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button
                key={digit}
                className="text-center text-xl font-bold"
                onClick={() => handleDigitClick(digit)}
              >
                {digit}
              </button>
            ))}
            <div></div>
            <button
              className="text-center text-xl font-bold"
              onClick={() => handleDigitClick(0)}
            >
              {0}
            </button>
            <button
              className="h-8 w-8 text-center"
              onClick={handleBackspaceClick}
            >
              &#9003; {/* Backspace Icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
