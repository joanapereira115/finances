'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { store } from '@/app/store/store';
import { update } from '@/app/store/pin-context';
import { initialize, pinDefined, definePin, validatePin } from '@/app/lib/auth';

export default function Pin() {
  const { push } = useRouter();
  const [pin, setPin] = useState(['', '', '', '']);
  const [defined, setDefined] = useState(false);
  const [pressedDigit, setPressedDigit] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Check if a PIN code has already been defined
  // Initialize necessary files/folders
  // Set up event listener for keystrokes
  useEffect(() => {
    const isPinDefined = async () => {
      if ((await pinDefined()) === true) {
        setDefined(true);
      }
    };

    const init = async () => {
      initialize();
    };

    isPinDefined();
    init();

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  let title = 'Introduza o PIN';
  if (!defined) {
    title = 'Defina o seu PIN';
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key >= '0' && event.key <= '9') || event.key === 'Backspace') {
      setPressedDigit(event.key);
    }
  };

  const handleDigitClick = (digit) => {
    const newPin = [...pin];
    const emptyIndex = newPin.indexOf('');

    if (emptyIndex !== -1) {
      setTimeout(() => {
        newPin[emptyIndex] = digit;
        setPin(newPin);
        setPressedDigit('');
      }, 100);
    }
  };

  const handleBackspaceClick = () => {
    const newPin = [...pin];
    const lastIndex = newPin.indexOf('');

    setTimeout(() => {
      if (lastIndex !== 0 && lastIndex !== -1) {
        newPin[lastIndex - 1] = '';
        setPin(newPin);
      } else if (lastIndex === -1) {
        newPin[newPin.length - 1] = '';
        setPin(newPin);
      }
      setPressedDigit('');
    }, 100);
  };

  useEffect(() => {
    if (pressedDigit) {
      if (pressedDigit >= '0' && pressedDigit <= '9') {
        handleDigitClick(pressedDigit);
      } else if (pressedDigit === 'Backspace') {
        handleBackspaceClick();
      }
    }
  }, [pressedDigit]);

  useEffect(() => {
    const definePinHandler = async () => {
      if (pin.indexOf('') === -1) {
        if (defined) {
          const success = await validatePin(pin.join(''));
          if (success) {
            store.dispatch(update(pin.join('')));
            push('/dashboard');
          } else {
            setPin(['', '', '', '']);
            setError('PIN inválido');
          }
        } else {
          const success = await definePin(pin.join(''));
          if (success) {
            setDefined(true);
          } else {
            setError('Ocorreu um erro a definir o PIN');
          }
          setPin(['', '', '', '']);
        }
      } else if (pin.indexOf('') === 1) {
        setError(undefined);
      }
    };

    definePinHandler();
  }, [pin]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-[50vh] w-[35%] flex-col items-center justify-center rounded-xl bg-black-600 p-4 text-white drop-shadow-md">
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
                  <div className="h-3 w-3 rounded-full bg-lilac-100"></div>
                ) : (
                  <div className="h-3 w-3 rounded-full border border-solid border-lilac-100"></div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                className={clsx(
                  'text-center font-bold',
                  digit == pressedDigit ? 'text-lg' : 'text-xl',
                )}
                onClick={() => setPressedDigit(digit)}
              >
                {digit}
              </button>
            ))}
            <div></div>
            <button
              className={clsx(
                'text-center font-bold',
                '0' == pressedDigit ? 'text-lg' : 'text-xl',
              )}
              onClick={() => setPressedDigit('0')}
            >
              {0}
            </button>
            <button
              className={clsx(
                'h-8 w-8 text-center',
                'Backspace' == pressedDigit ? 'scale-[0.9]' : '',
              )}
              onClick={() => setPressedDigit('Backspace')}
            >
              &#9003; {/* Backspace Icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
