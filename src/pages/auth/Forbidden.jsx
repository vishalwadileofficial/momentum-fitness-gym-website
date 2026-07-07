import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiArrowLeft } from 'react-icons/fi';
import Container from '@/components/common/Container';
import Button from '@/components/ui/Button';

export default function Forbidden() {
  return (
    <>
      <Helmet>
        <title>Access Denied | Momentum Fitness</title>
        <meta name="description" content="Unauthorized access block." />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center py-16 bg-gym-gray-950">
        <Container>
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.1)]">
              <FiAlertTriangle className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-sm font-black text-red-500 uppercase tracking-widest">Error 403 &bull; Forbidden</h1>
              <h2 className="text-3xl font-black font-display text-white tracking-tight">ACCESS RESTRICTED</h2>
              <p className="text-xs text-gym-gray-400 leading-relaxed">
                Your authenticated account profile does not possess the credentials or role level required to access this portal route.
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <Link to="/dashboard">
                <Button variant="primary" className="flex items-center gap-2">
                  <FiArrowLeft /> Back to Portal
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline">Public Site</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
