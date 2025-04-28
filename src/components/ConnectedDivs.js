/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from 'react';

// Improved mock data structure mimicking a backend response
const mockPolicyData = {
  metadata: {
    version: '1.0.0',
    lastUpdated: '2024-03-05T12:00:00Z',
    totalNodes: 16
  },
  nodes: [
    {
      id: 'advocacy',
      title: 'المناصرة والتأثير',
      category: 'استراتيجية',
      priority: 1,
      createdAt: '2024-02-15T10:30:00Z',
      updatedAt: '2024-03-01T15:45:00Z',
      tags: ['مناصرة', 'تأثير', 'سياسات']
    },
    {
      id: 'fundraising',
      title: 'جمع التبرعات',
      category: 'تمويل',
      priority: 2,
      createdAt: '2024-02-16T11:20:00Z',
      updatedAt: '2024-03-02T16:30:00Z',
      tags: ['تبرعات', 'تمويل', 'دعم']
    },
    {
      id: 'community',
      title: 'مشاركة المجتمع',
      category: 'تفاعل',
      priority: 3,
      createdAt: '2024-02-17T09:45:00Z',
      updatedAt: '2024-03-03T14:15:00Z',
      tags: ['مجتمع', 'تفاعل', 'تعاون']
    },
    {
      id: 'transparency',
      title: 'الشفافية',
      category: 'حوكمة',
      priority: 4,
      createdAt: '2024-02-18T13:00:00Z',
      updatedAt: '2024-03-04T17:20:00Z',
      tags: ['شفافية', 'مساءلة', 'حوكمة']
    },
    {
      id: 'volunteers',
      title: 'إدارة المتطوعين',
      category: 'موارد بشرية',
      priority: 5,
      createdAt: '2024-02-19T15:30:00Z',
      updatedAt: '2024-03-05T18:45:00Z',
      tags: ['متطوعون', 'إدارة', 'موارد']
    },
    {
      id: 'education',
      title: 'التوعية والتعليم',
      category: 'تنمية',
      priority: 6,
      createdAt: '2024-02-20T16:45:00Z',
      updatedAt: '2024-03-06T19:30:00Z',
      tags: ['تعليم', 'توعية', 'تنمية']
    },
    {
      id: 'partnerships',
      title: 'بناء الشراكات',
      category: 'تعاون',
      priority: 7,
      createdAt: '2024-02-21T14:15:00Z',
      updatedAt: '2024-03-07T20:15:00Z',
      tags: ['شراكات', 'تعاون', 'شبكات']
    },
    {
      id: 'impact',
      title: 'قياس الأثر',
      category: 'تقييم',
      priority: 8,
      createdAt: '2024-02-22T10:00:00Z',
      updatedAt: '2024-03-08T21:00:00Z',
      tags: ['أثر', 'تقييم', 'مؤشرات']
    },
    {
      id: 'technology',
      title: 'استخدام التكنولوجيا',
      category: 'ابتكار',
      priority: 9,
      createdAt: '2024-02-23T11:30:00Z',
      updatedAt: '2024-03-09T22:30:00Z',
      tags: ['تكنولوجيا', 'ابتكار', 'تحول رقمي']
    },
    {
      id: 'sustainability',
      title: 'الاستدامة',
      category: 'استراتيجية',
      priority: 10,
      createdAt: '2024-02-24T12:45:00Z',
      updatedAt: '2024-03-10T23:45:00Z',
      tags: ['استدامة', 'تمويل', 'خطط طويلة المدى']
    },
    {
      id: 'advocacyTools',
      title: 'أدوات المناصرة',
      category: 'موارد',
      priority: 11,
      createdAt: '2024-02-25T13:15:00Z',
      updatedAt: '2024-03-11T00:15:00Z',
      tags: ['أدوات', 'مناصرة', 'تدريب']
    },
    {
      id: 'diversity',
      title: 'التنوع والشمول',
      category: 'قيم',
      priority: 12,
      createdAt: '2024-02-26T14:30:00Z',
      updatedAt: '2024-03-12T01:30:00Z',
      tags: ['تنوع', 'شمول', 'مساواة']
    },
    {
      id: 'leadership',
      title: 'تطوير القيادة',
      category: 'تنمية',
      priority: 13,
      createdAt: '2024-02-27T15:00:00Z',
      updatedAt: '2024-03-13T02:00:00Z',
      tags: ['قيادة', 'تدريب', 'تمكين']
    },
    {
      id: 'communication',
      title: 'الاتصال الفعال',
      category: 'تفاعل',
      priority: 14,
      createdAt: '2024-02-28T16:15:00Z',
      updatedAt: '2024-03-14T03:15:00Z',
      tags: ['اتصال', 'تفاعل', 'علاقات عامة']
    },
    {
      id: 'innovation',
      title: 'الابتكار في العمل',
      category: 'ابتكار',
      priority: 15,
      createdAt: '2024-02-29T17:45:00Z',
      updatedAt: '2024-03-15T04:45:00Z',
      tags: ['ابتكار', 'إبداع', 'تحسين']
    },
    {
      id: 'global',
      title: 'التعاون العالمي',
      category: 'شبكات',
      priority: 16,
      createdAt: '2024-03-01T18:30:00Z',
      updatedAt: '2024-03-16T05:30:00Z',
      tags: ['عالمي', 'شبكات', 'تعاون']
    }
  ],
  connections: [
    { 
      id: 'conn-1',
      from: 'advocacy', 
      to: 'fundraising', 
      color: '#ff6b6b',
      type: 'استراتيجية',
      weight: 0.7,
      createdAt: '2024-03-01T10:00:00Z'
    },
    { 
      id: 'conn-2',
      from: 'advocacy', 
      to: 'community', 
      color: '#48dbfb',
      type: 'تفاعل',
      weight: 0.6,
      createdAt: '2024-03-01T11:00:00Z'
    },
    { 
      id: 'conn-3',
      from: 'fundraising', 
      to: 'transparency', 
      color: '#ff6b6b',
      type: 'حوكمة',
      weight: 0.8,
      createdAt: '2024-03-01T12:00:00Z'
    },
    { 
      id: 'conn-4',
      from: 'community', 
      to: 'volunteers', 
      color: '#1dd1a1',
      type: 'تفاعل',
      weight: 0.5,
      createdAt: '2024-03-01T13:00:00Z'
    },
    { 
      id: 'conn-5',
      from: 'transparency', 
      to: 'impact', 
      color: '#6c5ce7',
      type: 'تقييم',
      weight: 0.6,
      createdAt: '2024-03-02T14:00:00Z'
    },
    { 
      id: 'conn-6',
      from: 'volunteers', 
      to: 'education', 
      color: '#ff9ff3',
      type: 'تنمية',
      weight: 0.7,
      createdAt: '2024-03-02T15:00:00Z'
    },
    { 
      id: 'conn-7',
      from: 'education', 
      to: 'partnerships', 
      color: '#54a0ff',
      type: 'تعاون',
      weight: 0.5,
      createdAt: '2024-03-02T16:00:00Z'
    },
    { 
      id: 'conn-8',
      from: 'partnerships', 
      to: 'technology', 
      color: '#ff6b6b',
      type: 'ابتكار',
      weight: 0.8,
      createdAt: '2024-03-02T17:00:00Z'
    },
    { 
      id: 'conn-9',
      from: 'technology', 
      to: 'sustainability', 
      color: '#10ac84',
      type: 'استراتيجية',
      weight: 0.6,
      createdAt: '2024-03-02T18:00:00Z'
    },
    { 
      id: 'conn-10',
      from: 'sustainability', 
      to: 'advocacyTools', 
      color: '#ff6b6b',
      type: 'موارد',
      weight: 0.7,
      createdAt: '2024-03-02T19:00:00Z'
    },
    { 
      id: 'conn-11',
      from: 'advocacyTools', 
      to: 'diversity', 
      color: '#48dbfb',
      type: 'قيم',
      weight: 0.6,
      createdAt: '2024-03-02T20:00:00Z'
    },
    { 
      id: 'conn-12',
      from: 'diversity', 
      to: 'leadership', 
      color: '#1dd1a1',
      type: 'تنمية',
      weight: 0.5,
      createdAt: '2024-03-02T21:00:00Z'
    },
    { 
      id: 'conn-13',
      from: 'leadership', 
      to: 'communication', 
      color: '#6c5ce7',
      type: 'تفاعل',
      weight: 0.6,
      createdAt: '2024-03-02T22:00:00Z'
    },
    { 
      id: 'conn-14',
      from: 'communication', 
      to: 'innovation', 
      color: '#ff9ff3',
      type: 'ابتكار',
      weight: 0.7,
      createdAt: '2024-03-02T23:00:00Z'
    },
    { 
      id: 'conn-15',
      from: 'innovation', 
      to: 'global', 
      color: '#54a0ff',
      type: 'شبكات',
      weight: 0.5,
      createdAt: '2024-03-03T00:00:00Z'
    }
  ]
};

const PolicyNetworkVisualization = () => {
  const policyRefs = Object.fromEntries(
    mockPolicyData.nodes.map(node => [node.id, useRef(null)]
  ));
  
  const [lines, setLines] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [highlightedConnections, setHighlightedConnections] = useState([]);

  useEffect(() => {
    const createLines = () => {
      setTimeout(() => {
        const newLines = mockPolicyData.connections.map((connection) => {
          const fromRef = policyRefs[connection.from];
          const toRef = policyRefs[connection.to];
          
          if (!fromRef?.current || !toRef?.current) return null;
          
          const fromRect = fromRef.current.getBoundingClientRect();
          const toRect = toRef.current.getBoundingClientRect();
          
          const fromX = fromRect.left + fromRect.width / 2;
          const fromY = fromRect.top + fromRect.height / 2;
          const toX = toRect.left + toRect.width / 2;
          const toY = toRect.top + toRect.height / 2;
          
          const scrollX = window.scrollX;
          const scrollY = window.scrollY;
          
          // Calculate control points for curved path
          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;
          const controlPointOffsetX = (Math.random() - 0.5) * 200;
          const controlPointOffsetY = (Math.random() - 0.5) * 200;
          
          return {
            id: connection.id,
            from: connection.from,
            to: connection.to,
            x1: fromX + scrollX,
            y1: fromY + scrollY,
            x2: toX + scrollX,
            y2: toY + scrollY,
            cx: midX + controlPointOffsetX,
            cy: midY + controlPointOffsetY,
            color: connection.color,
            type: connection.type,
            weight: connection.weight
          };
        }).filter(line => line !== null);
        
        setLines(newLines);
      }, 500);
    };
    
    createLines();
    
    window.addEventListener('resize', createLines);
    return () => {
      window.removeEventListener('resize', createLines);
    };
  }, []);

  const handleMouseOver = (nodeId) => {
    setActiveNode(nodeId);
    
    const directConnections = mockPolicyData.connections.filter(
      conn => conn.from === nodeId || conn.to === nodeId
    );
    
    setHighlightedConnections(
      directConnections.map(conn => conn.id)
    );
  };

  const handleMouseOut = () => {
    setActiveNode(null);
    setHighlightedConnections([]);
  };
  const getPriorityColor = (priority) => {
    const colors = [
      'bg-green-100 text-green-800',
      'bg-blue-100 text-blue-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800'
    ];
    return colors[Math.min(priority - 1, colors.length - 1)];
  };

  const PolicyBox = ({ node, refObject }) => (
    <div
      ref={refObject}
      className={`
        relative bg-white rounded-xl shadow-md border-l-4 border-blue-500 
        cursor-pointer transition-all duration-300 overflow-hidden p-4
        transform hover:scale-103 hover:shadow-lg
        ${activeNode === node.id ? 'scale-103 shadow-lg' : ''}
        ${highlightedConnections.length > 0 ? 'opacity-50' : ''}
        ${highlightedConnections.some(conn => 
          mockPolicyData.connections.find(c => c.id === conn)?.from === node.id || 
          mockPolicyData.connections.find(c => c.id === conn)?.to === node.id
        ) ? 'opacity-100 bg-blue-50' : ''}
      `}
      style={{ height: '120px', minWidth: '250px' }}
      onMouseOver={() => handleMouseOver(node.id)}
      onMouseOut={handleMouseOut}
    >
      {/* Gradient background overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-200 to-purple-200"
        style={{ mixBlendMode: 'multiply' }}
      ></div>

      <div className="relative p-4 h-full !flex !flex-col !gap-2">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-xl font-bold w-full text-center text-gray-900 leading-tight">
            {node.title}
          </h3>
          {/* <span className={`
            ${getPriorityColor(node.priority)} 
            px-2 py-1 rounded-full text-xs font-semibold ml-2
          `}>
            Priority {node.priority}
          </span> */}
        </div>

        <div className="flex-grow">
          {/* <span className="text-sm text-gray-600 block mb-2">
            {node.category}
          </span> */}
          
          <div className="flex flex-wrap gap-1.5 mt-2 w-full justify-center items-center">
            {node.tags.map((tag, index) => (
              <span 
                key={index} 
                className="
                  inline-block 
                  bg-gray-100 
                  text-gray-700 
                  px-2 py-0.5 
                  rounded-full 
                  text-xs 
                  font-medium
                  hover:bg-blue-100
                  transition-colors
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-3 flex justify-between">
          <span>تاريخ الانشاء: {new Date(node.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full max-w-7xl mx-auto flex justify-center items-center p-4" style={{ minHeight: '600px' }}>
      <svg className="absolute top-[-90px] left-[-90px] w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {lines.map((line) => (
          <path
            key={line.id}
            d={`M${line.x1},${line.y1} Q${line.cx},${line.cy} ${line.x2},${line.y2}`}
            fill="none"
            stroke={line.color}
            strokeWidth={highlightedConnections.includes(line.id) ? 4 : 2}
            opacity={highlightedConnections.length === 0 ? 0.2 : (highlightedConnections.includes(line.id) ? 1 : 0.1)}
            strokeDasharray={highlightedConnections.includes(line.id) ? "none" : "4,4"}
            className="transition-all duration-500"
          />
        ))}
      </svg>
      
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {mockPolicyData.nodes.map(node => (
          <PolicyBox 
            key={node.id} 
            node={node} 
            refObject={policyRefs[node.id]} 
          />
        ))}
      </div>
    </div>
  );
};

export default PolicyNetworkVisualization;