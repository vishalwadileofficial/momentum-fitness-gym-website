import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiActivity, FiInfo } from 'react-icons/fi';

const BMICalculator = () => {
  const [unit, setUnit] = useState('metric'); // metric or imperial
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState(''); // cm for metric, inches for imperial
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [advice, setAdvice] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) return;

    let bmiVal;
    if (unit === 'metric') {
      // height is in cm, weight in kg
      const heightInMeters = h / 100;
      bmiVal = w / (heightInMeters * heightInMeters);
    } else {
      // height is in inches, weight in lbs
      bmiVal = (w / (h * h)) * 703;
    }

    const finalBmi = parseFloat(bmiVal.toFixed(1));
    setBmi(finalBmi);

    // Status and advice
    if (finalBmi < 18.5) {
      setStatus('Underweight');
      setAdvice('Focus on a caloric surplus with nutrient-dense foods and structured resistance training to build lean muscle mass safely.');
    } else if (finalBmi >= 18.5 && finalBmi < 25) {
      setStatus('Normal Weight');
      setAdvice('Excellent baseline. Maintain your physical state with balanced macro plans, strength cycles, and standard cardiovascular work.');
    } else if (finalBmi >= 25 && finalBmi < 30) {
      setStatus('Overweight');
      setAdvice('Incorporate a slight caloric deficit, clean whole-food nutrition, and a combination of heavy resistance lifting and high-energy conditioning.');
    } else {
      setStatus('Obese');
      setAdvice('Consider consulting our certified dietitian to structure a safe, progressive lifestyle plan, prioritizing joint stability and cardiovascular endurance.');
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    setWeight('');
    setHeight('');
    setBmi(null);
    setStatus('');
    setAdvice('');
  };

  return (
    <>
      <Helmet>
        <title>BMI Calculator | Momentum Fitness Tools</title>
        <meta name="description" content="Calculate your Body Mass Index (BMI) and analyze your weight status using our premium interactive calculator. Supporting metric and imperial values with customized tips." />
        <meta name="keywords" content="bmi calculator, calculate bmi, body mass index, weight chart, healthy weight, fitness tools" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative py-24 bg-gym-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <h1 className="text-xs uppercase tracking-widest text-primary font-bold">Health Utilities</h1>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white">BMI CALCULATOR</h2>
          <p className="text-gym-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Estimate your body mass index instantly to establish baseline metrics for your upcoming strength and conditioning cycles.
          </p>
        </div>
      </section>

      {/* Calculator Area */}
      <section className="py-12 bg-gym-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Input Form */}
            <div className="glass-card border border-gym-gray-800 p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white font-display uppercase tracking-wider">Metrics Input</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUnitChange('metric')}
                    className={`px-3 py-1 text-xs rounded font-semibold transition-all ${
                      unit === 'metric' ? 'bg-primary text-gym-dark' : 'bg-gym-gray-800 text-gym-gray-400'
                    }`}
                  >
                    Metric (kg/cm)
                  </button>
                  <button
                    onClick={() => handleUnitChange('imperial')}
                    className={`px-3 py-1 text-xs rounded font-semibold transition-all ${
                      unit === 'imperial' ? 'bg-primary text-gym-dark' : 'bg-gym-gray-800 text-gym-gray-400'
                    }`}
                  >
                    Imperial (lbs/in)
                  </button>
                </div>
              </div>

              <form onSubmit={calculateBMI} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-2">
                    Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'e.g. 80' : 'e.g. 175'}
                    className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-gym-gray-400 mb-2">
                    Height ({unit === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={unit === 'metric' ? 'e.g. 180' : 'e.g. 70'}
                    className="w-full bg-gym-gray-800 border border-gym-gray-700 rounded p-3 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-gym-dark font-bold text-sm uppercase tracking-wider rounded hover:bg-primary-dark transition-all duration-300"
                >
                  Compute BMI Score
                </button>
              </form>
            </div>

            {/* Results Display */}
            <div className="glass-card border border-gym-gray-800 p-8 rounded-2xl flex flex-col justify-center">
              {bmi === null ? (
                <div className="text-center py-8 space-y-4">
                  <FiActivity className="w-12 h-12 text-gym-gray-700 mx-auto animate-pulse" />
                  <p className="text-sm text-gym-gray-400 font-medium">
                    Input your body weight and height parameters, then click compute to visualize your analysis.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-xs uppercase tracking-widest text-gym-gray-400 font-bold">Your Computed Score</p>
                    <p className="text-6xl font-black font-display text-primary">{bmi}</p>
                    <span className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      status === 'Normal Weight' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      status === 'Underweight' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {status}
                    </span>
                  </div>

                  <div className="border-t border-gym-gray-800 pt-6 space-y-3">
                    <h4 className="text-xs uppercase font-bold text-white tracking-widest flex items-center gap-1.5">
                      <FiInfo className="w-4 h-4 text-primary" />
                      Momentum Training Advice
                    </h4>
                    <p className="text-xs text-gym-gray-400 leading-relaxed">
                      {advice}
                    </p>
                  </div>

                  <div className="bg-gym-gray-950 p-4 rounded-lg border border-gym-gray-800 space-y-2.5">
                    <p className="text-[10px] uppercase font-bold text-white tracking-wider">Standard Range Reference</p>
                    <div className="grid grid-cols-4 gap-1 text-[10px] text-center font-semibold">
                      <div className="p-1 rounded bg-gym-gray-900 border border-gym-gray-800 text-yellow-400">
                        &lt; 18.5<br />Under
                      </div>
                      <div className="p-1 rounded bg-gym-gray-900 border border-gym-gray-800 text-green-400">
                        18.5 - 24.9<br />Normal
                      </div>
                      <div className="p-1 rounded bg-gym-gray-900 border border-gym-gray-800 text-red-400">
                        25 - 29.9<br />Over
                      </div>
                      <div className="p-1 rounded bg-gym-gray-900 border border-gym-gray-800 text-red-600">
                        30+<br />Obese
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BMICalculator;
