import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const HomeSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      {/* Header Skeleton */}
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width="100%" height={60} />
        <SkeletonPlaceholder.Item width="100%" height={40} />
      </SkeletonPlaceholder.Item>

      {/* Calendar Strip Skeleton */}
      <SkeletonPlaceholder.Item width="100%" height={200} />

      {/* Today's Attendance Section Skeleton */}
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width="100%" height={30} />
        <SkeletonPlaceholder.Item width="100%" height={100} />
        <SkeletonPlaceholder.Item width="100%" height={100} />
      </SkeletonPlaceholder.Item>

      {/* Recent Activities Section Skeleton */}
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width="100%" height={30} />
        <SkeletonPlaceholder.Item width="100%" height={100} />
        <SkeletonPlaceholder.Item width="100%" height={100} />
        <SkeletonPlaceholder.Item width="100%" height={100} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default HomeSkeleton;
