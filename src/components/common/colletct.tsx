import { StarOutlined, StarFilled } from "@ant-design/icons";

interface CollectItemProps {
    handleStarClick: () => void; // Typing the click handler function correctly
    collected: boolean;
    loading: boolean;
  }
  const CollectItem: React.FC<CollectItemProps> = ({ handleStarClick, collected, loading }) => {
  return (
    <div
      onClick={handleStarClick}
      style={{
        cursor: loading ? "wait" : "pointer",
        padding: "8px",
      }}
    >
      {collected ? (
        <StarFilled
          style={{
            color: "#fadb14",
            opacity: loading || loading ? 0.5 : 1,
          }}
        />
      ) : (
        <StarOutlined
          style={{
            opacity: loading || loading ? 0.5 : 1,
          }}
        />
      )}
    </div>
  );
};

export default CollectItem;
